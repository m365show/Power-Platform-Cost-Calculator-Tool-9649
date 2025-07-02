import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from "firebase/firestore";
import { auth, db } from '../lib/firebase';

// Generate session ID for anonymous users
const generateSessionId = () => {
  return 'anon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Helper functions for Firebase operations
export const firebaseHelpers = {
  // CRITICAL: Initialize users on app startup
  async initializeUsers() {
    try {
      console.log('🔄 Initializing Firebase users...');
      
      const users = [
        {
          uid: 'mirko-peters-super-admin',
          name: 'Mirko Peters',
          email: 'mirko.peters@m365.show',
          password: 'Bierjunge123!',
          role: 'SUPER_ADMIN',
          company: 'M365 Show',
          department: 'Administration'
        },
        {
          uid: 'marcel-broschk-manager',
          name: 'Marcel Broschk',
          email: 'marcel.broschk@cgi.com',
          password: 'marcel123!',
          role: 'MANAGER',
          company: 'CGI',
          department: 'Consulting'
        }
      ];

      for (const userData of users) {
        await this.ensureUserExists(userData);
      }

      console.log('✅ Firebase user initialization complete');
      return { success: true };
    } catch (error) {
      console.error('❌ Firebase user initialization failed:', error);
      throw error;
    }
  },

  // Ensure a specific user exists in Firebase
  async ensureUserExists(userData) {
    try {
      console.log(`🔍 Checking Firebase user: ${userData.email}`);
      
      // Check if user profile exists in Firestore
      const userRef = doc(db, 'users', userData.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        console.log(`🔄 Creating Firebase user profile: ${userData.email}`);
        
        // Create user profile in Firestore
        await setDoc(userRef, {
          uid: userData.uid,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          company: userData.company,
          department: userData.department,
          isActive: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        console.log(`✅ Firebase profile created for: ${userData.email}`);

        // Try to create auth user
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth, 
            userData.email, 
            userData.password
          );

          // Update auth profile
          await updateProfile(userCredential.user, {
            displayName: userData.name
          });

          // Update Firestore with auth UID
          await updateDoc(userRef, {
            authUid: userCredential.user.uid,
            updatedAt: serverTimestamp()
          });

          console.log(`🔗 Firebase auth linked for: ${userData.email}`);
          
          // Sign out to not interfere with user session
          await signOut(auth);
        } catch (authErr) {
          if (authErr.code === 'auth/email-already-in-use') {
            console.log(`⚠️ Auth user already exists for ${userData.email}, skipping auth creation`);
          } else {
            console.log(`⚠️ Auth creation failed for ${userData.email}:`, authErr.message);
          }
        }
      } else {
        console.log(`ℹ️ Firebase user already exists: ${userData.email}`);
        
        // Check if auth UID is linked
        const userData_existing = userSnap.data();
        if (!userData_existing.authUid) {
          console.log(`🔄 Attempting to link auth for existing user: ${userData.email}`);
          // Auth linking will be handled during sign-in
        }
      }
    } catch (error) {
      console.error(`❌ Error ensuring Firebase user exists ${userData.email}:`, error);
    }
  },

  // Authentication functions
  async signIn(email, password) {
    try {
      console.log('🔄 Starting Firebase sign in process for:', email);
      
      // FIRST: Ensure users are initialized
      await this.initializeUsers();
      
      // Step 1: Check if user exists in Firestore
      console.log('🔍 Checking user in Firestore...');
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email), where('isActive', '==', true));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error('❌ User not found in Firestore');
        throw new Error('User not found in database. Please contact an administrator.');
      }

      const userDoc = querySnapshot.docs[0];
      const userProfile = { id: userDoc.id, ...userDoc.data() };
      console.log('✅ User found in Firestore:', userProfile.name, 'Role:', userProfile.role);

      // Step 2: Try to authenticate with Firebase Auth
      console.log('🔐 Attempting Firebase auth...');
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('✅ Firebase authentication successful');

        // Step 3: Update profile with auth UID if not already linked
        if (!userProfile.authUid) {
          console.log('🔗 Linking auth UID to profile...');
          await updateDoc(doc(db, 'users', userDoc.id), {
            authUid: userCredential.user.uid,
            lastActive: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          userProfile.authUid = userCredential.user.uid;
        } else {
          // Just update last active
          await updateDoc(doc(db, 'users', userDoc.id), {
            lastActive: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        }

        console.log('✅ Firebase login completed successfully for:', userProfile.name);

        return {
          user: userCredential.user,
          profile: userProfile
        };
      } catch (authError) {
        if (authError.code === 'auth/user-not-found' || authError.code === 'auth/wrong-password') {
          console.log('⚠️ Auth user does not exist or wrong password, attempting to create auth account...');
          
          // Try to create auth user
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update auth profile
            await updateProfile(userCredential.user, {
              displayName: userProfile.name
            });

            // Update Firestore profile with auth UID
            await updateDoc(doc(db, 'users', userDoc.id), {
              authUid: userCredential.user.uid,
              lastActive: serverTimestamp(),
              updatedAt: serverTimestamp()
            });

            console.log('✅ Firebase auth account created and linked successfully');

            return {
              user: userCredential.user,
              profile: { ...userProfile, authUid: userCredential.user.uid }
            };
          } catch (createError) {
            console.error('❌ Failed to create auth account:', createError);
            throw new Error('Failed to create authentication account: ' + createError.message);
          }
        } else {
          console.error('❌ Firebase auth error:', authError);
          throw new Error('Authentication failed: ' + authError.message);
        }
      }
    } catch (error) {
      console.error('❌ Firebase sign in failed:', error);
      throw error;
    }
  },

  async signUp(userData) {
    try {
      console.log('🔄 Creating new Firebase user:', userData.email);
      
      // Step 1: Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );

      console.log('✅ Firebase auth user created, creating profile...');

      // Step 2: Update auth profile
      await updateProfile(userCredential.user, {
        displayName: userData.name
      });

      // Step 3: Create user profile in Firestore
      const userRef = doc(db, 'users', userCredential.user.uid);
      const profile = {
        uid: userCredential.user.uid,
        authUid: userCredential.user.uid,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'VIEWER',
        company: userData.company || '',
        department: userData.department || '',
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(userRef, profile);

      console.log('✅ Firebase user created successfully:', profile.name);
      return { user: userCredential.user, profile };
    } catch (error) {
      console.error('❌ Firebase sign up failed:', error);
      throw error;
    }
  },

  async signOut() {
    try {
      await signOut(auth);
      console.log('✅ Firebase signed out successfully');
    } catch (error) {
      console.error('❌ Firebase sign out error:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          unsubscribe();
          
          if (!user) {
            console.log('ℹ️ No authenticated Firebase user');
            resolve(null);
            return;
          }

          console.log('🔍 Getting Firebase user profile for:', user.email);

          // Get user profile from Firestore
          try {
            // Try to find by auth UID first
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              const profile = { id: userSnap.id, ...userSnap.data() };
              console.log('✅ Firebase profile found by auth UID:', profile.name);
              resolve({ ...user, profile });
              return;
            }

            // If not found by UID, try by email
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', user.email), where('isActive', '==', true));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0];
              const profile = { id: userDoc.id, ...userDoc.data() };
              console.log('✅ Firebase profile found by email:', profile.name);
              
              // Update the profile with auth UID
              await updateDoc(doc(db, 'users', userDoc.id), {
                authUid: user.uid,
                updatedAt: serverTimestamp()
              });
              
              resolve({ ...user, profile: { ...profile, authUid: user.uid } });
              return;
            }

            console.log('⚠️ No Firebase profile found for authenticated user');
            resolve({ ...user, profile: null });
          } catch (error) {
            console.error('❌ Error getting Firebase user profile:', error);
            resolve({ ...user, profile: null });
          }
        });
      });
    } catch (error) {
      console.error('❌ Get current Firebase user error:', error);
      return null;
    }
  },

  // Initialize database with proper structure
  async initializeDatabase() {
    try {
      console.log('🔄 Initializing Firebase database...');
      
      // Initialize users first
      await this.initializeUsers();
      
      // Check if users exist
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      console.log('✅ Firebase database initialization complete. Users found:', users.length);
      return { success: true, users };
    } catch (error) {
      console.error('❌ Firebase database initialization failed:', error);
      throw error;
    }
  },

  // User management functions
  async getUsers() {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
        lastActive: doc.data().lastActive?.toDate()
      }));

      return users;
    } catch (error) {
      console.error('❌ Get Firebase users failed:', error);
      throw error;
    }
  },

  async updateUser(userId, updates) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });

      const updatedDoc = await getDoc(userRef);
      return { id: updatedDoc.id, ...updatedDoc.data() };
    } catch (error) {
      console.error('❌ Update Firebase user failed:', error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      await deleteDoc(doc(db, 'users', userId));
      return { success: true };
    } catch (error) {
      console.error('❌ Delete Firebase user failed:', error);
      throw error;
    }
  },

  // Estimate management
  async saveEstimate(estimateData) {
    try {
      const estimatesRef = collection(db, 'estimates');
      const docRef = await addDoc(estimatesRef, {
        ...estimateData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const estimateDoc = await getDoc(docRef);
      return { id: estimateDoc.id, ...estimateDoc.data() };
    } catch (error) {
      console.error('❌ Save Firebase estimate failed:', error);
      throw error;
    }
  },

  async getEstimates(userId = null) {
    try {
      const estimatesRef = collection(db, 'estimates');
      let q;
      
      if (userId) {
        q = query(estimatesRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
      } else {
        q = query(estimatesRef, orderBy('createdAt', 'desc'));
      }

      const querySnapshot = await getDocs(q);
      
      const estimates = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      }));

      // Get user data for each estimate
      const estimatesWithUsers = await Promise.all(
        estimates.map(async (estimate) => {
          if (estimate.userId) {
            try {
              const userDoc = await getDoc(doc(db, 'users', estimate.userId));
              if (userDoc.exists()) {
                return {
                  ...estimate,
                  user: { id: userDoc.id, ...userDoc.data() }
                };
              }
            } catch (error) {
              console.warn('Could not fetch user for estimate:', estimate.id);
            }
          }
          return estimate;
        })
      );

      return estimatesWithUsers;
    } catch (error) {
      console.error('❌ Get Firebase estimates failed:', error);
      throw error;
    }
  },

  // Anonymous estimate management
  async saveAnonymousEstimate(estimateData) {
    try {
      const sessionId = generateSessionId();
      const anonymousRef = collection(db, 'anonymousEstimates');
      const docRef = await addDoc(anonymousRef, {
        ...estimateData,
        sessionId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const estimateDoc = await getDoc(docRef);
      return { id: estimateDoc.id, sessionId, ...estimateDoc.data() };
    } catch (error) {
      console.error('❌ Save Firebase anonymous estimate failed:', error);
      throw error;
    }
  },

  // Consultation requests
  async requestConsultation(estimateId, contactInfo, isAnonymous = false) {
    try {
      const consultationsRef = collection(db, 'consultationRequests');
      const requestData = {
        estimateId: !isAnonymous ? estimateId : null,
        anonymousEstimateId: isAnonymous ? estimateId : null,
        requesterName: contactInfo.name,
        requesterEmail: contactInfo.email,
        companyName: contactInfo.company,
        phone: contactInfo.phone,
        preferredContactMethod: contactInfo.preferredContact || 'email',
        message: contactInfo.message,
        urgency: contactInfo.urgency || 'normal',
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(consultationsRef, requestData);
      const consultationDoc = await getDoc(docRef);
      
      return { id: consultationDoc.id, ...consultationDoc.data() };
    } catch (error) {
      console.error('❌ Request Firebase consultation failed:', error);
      throw error;
    }
  },

  // Analytics and reporting
  async getEstimateStats() {
    try {
      const [estimatesSnapshot, anonymousSnapshot, consultationsSnapshot] = await Promise.all([
        getDocs(collection(db, 'estimates')),
        getDocs(collection(db, 'anonymousEstimates')),
        getDocs(collection(db, 'consultationRequests'))
      ]);

      const estimates = estimatesSnapshot.docs.map(doc => doc.data());
      const anonymousEstimates = anonymousSnapshot.docs.map(doc => doc.data());
      const consultations = consultationsSnapshot.docs.map(doc => doc.data());

      const allEstimates = [...estimates, ...anonymousEstimates];

      const stats = {
        total: allEstimates.length,
        totalRegistered: estimates.length,
        totalAnonymous: anonymousEstimates.length,
        completed: estimates.filter(e => e.status === 'completed').length,
        totalValue: allEstimates.reduce((sum, e) => sum + (e.costMax || 0), 0),
        avgValue: allEstimates.length > 0 ? allEstimates.reduce((sum, e) => sum + (e.costMax || 0), 0) / allEstimates.length : 0,
        complexityBreakdown: allEstimates.reduce((acc, e) => {
          if (e.complexity) {
            acc[e.complexity] = (acc[e.complexity] || 0) + 1;
          }
          return acc;
        }, {}),
        consultationStats: {
          total: consultations.length,
          pending: consultations.filter(r => r.status === 'pending').length,
          assigned: consultations.filter(r => r.status === 'assigned').length,
          completed: consultations.filter(r => r.status === 'completed').length
        }
      };

      return stats;
    } catch (error) {
      console.error('❌ Error getting Firebase stats:', error);
      return {
        total: 0,
        totalRegistered: 0,
        totalAnonymous: 0,
        completed: 0,
        totalValue: 0,
        avgValue: 0,
        complexityBreakdown: {},
        consultationStats: {
          total: 0,
          pending: 0,
          assigned: 0,
          completed: 0
        }
      };
    }
  }
};

export default firebaseHelpers;