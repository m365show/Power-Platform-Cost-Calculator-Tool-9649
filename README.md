# Power Platform Cost Calculator

🚀 **Live Site**: [https://power-platform.m365calc.com](https://power-platform.m365calc.com)

A comprehensive web application for calculating Microsoft Power Platform project costs and generating professional PDF proposals.

## 🌟 Features

### 📊 **Intelligent Cost Calculator**
- **6-step guided process** for accurate project scoping
- **Dynamic cost estimation** based on complexity, features, and requirements
- **Professional PDF proposals** with company branding
- **Real-time timeline calculations** based on project urgency

### 🔐 **Role-Based Access Control**
- **Viewer**: View and download own estimates
- **Consultant**: Create and manage client estimates  
- **Manager**: Team oversight and approval workflows
- **Admin**: Full system management and user creation

### 💼 **Professional Features**
- **Company logo integration** in PDF reports
- **Detailed project breakdowns** with cost justification
- **Email notifications** to pp@m365.show
- **LinkedIn integration** for M365 Show community

### 🏗️ **Platform Coverage**
- **Power Apps** - Custom business applications
- **Power Automate** - Workflow automation
- **Power BI** - Business intelligence and analytics
- **Dataverse** - Secure data management
- **SharePoint/Teams** - Collaboration integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-repo/power-platform-calculator.git

# Navigate to project directory
cd power-platform-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 🔑 Admin Access

```
Email: mirko.peters@m365.show
Password: Bierjunge123!
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Calculator.jsx    # Main calculator component
│   ├── Results.jsx       # Results display with login protection
│   ├── UserManagement.jsx # Admin user management
│   └── ...
├── context/             # React context providers
│   ├── AuthContext.jsx  # Authentication & permissions
│   └── AppContext.jsx   # Application state
├── utils/               # Utility functions
│   ├── costCalculator.js # Cost calculation logic
│   ├── pitchDeckGenerator.js # PDF generation
│   └── emailService.js  # Email notifications
└── hooks/               # Custom React hooks
```

## 🎯 Key Components

### Calculator Flow
1. **Company Information** - Basic company details and industry
2. **Project Requirements** - App type and business challenges
3. **Platform Tools** - Microsoft technology selection
4. **Features** - Specific functionality requirements
5. **Scope & Budget** - User count and budget range
6. **Timeline & Details** - Urgency and special requirements

### Cost Calculation Algorithm
- **Base cost calculation** using company size multipliers
- **Platform tool pricing** with complexity factors
- **Feature-based cost additions** with development time estimates
- **User count scaling** with enterprise multipliers
- **Urgency adjustments** for timeline requirements

### PDF Generation
- **Professional branding** with company logos
- **Comprehensive project breakdown** with technical details
- **Cost justification** and timeline explanations
- **Next steps guidance** for implementation

## 🔧 Configuration

### Email Service Setup
Update `src/utils/emailService.js` with your EmailJS credentials:

```javascript
const EMAILJS_PUBLIC_KEY = "your_public_key";
const EMAILJS_SERVICE_ID = "your_service_id";
const EMAILJS_TEMPLATE_ID = "your_template_id";
```

### Domain Configuration
The application is configured for: `https://power-platform.m365calc.com`

Update URLs in:
- `index.html` (meta tags)
- `package.json` (homepage)
- `src/components/LandingPage.jsx` (share URLs)

## 🛡️ Security Features

### Authentication
- **JWT-based authentication** with role validation
- **Protected routes** requiring login for results
- **Permission-based UI** components

### Role Permissions
- **VIEWER**: Own estimates only
- **CONSULTANT**: Create estimates for clients
- **MANAGER**: Team management capabilities
- **ADMIN**: Full system access and user management

### Data Protection
- **Client-side validation** for all form inputs
- **Secure PDF generation** with watermarks
- **Email encryption** for sensitive data transmission

## 📈 Analytics & Tracking

### Built-in Analytics
- **User interaction tracking** via Quest SDK
- **Estimate completion rates** and abandonment analysis
- **Popular feature combinations** for pricing optimization

### External Integrations
- **Google Analytics** ready (add tracking ID)
- **LinkedIn tracking** for M365 Show community growth
- **Email delivery tracking** via EmailJS

## 🔄 Development Workflow

### Available Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint checking
npm run preview      # Preview production build
```

### Code Quality
- **ESLint configuration** with React hooks rules
- **Prettier formatting** for consistent code style
- **TypeScript support** ready for migration

## 🚀 Deployment

### Recommended Platforms
- **Vercel** (recommended for React apps)
- **Netlify** (great for static sites)
- **AWS S3 + CloudFront** (enterprise deployments)

### Environment Variables
```bash
VITE_EMAILJS_PUBLIC_KEY=your_key
VITE_EMAILJS_SERVICE_ID=your_service
VITE_EMAILJS_TEMPLATE_ID=your_template
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Application**: [https://power-platform.m365calc.com](https://power-platform.m365calc.com)
- **M365 Show LinkedIn**: [https://www.linkedin.com/school/m365-show/](https://www.linkedin.com/school/m365-show/)
- **Support Email**: pp@m365.show

## 🏆 Features Roadmap

### Upcoming Features
- [ ] **Multi-language support** (German, French, Spanish)
- [ ] **Advanced reporting** with usage analytics
- [ ] **API integration** with CRM systems
- [ ] **Mobile app** for iOS and Android
- [ ] **White-label solutions** for partners

### Technical Improvements
- [ ] **TypeScript migration** for better type safety
- [ ] **PWA capabilities** for offline functionality
- [ ] **Advanced caching** with service workers
- [ ] **Database integration** with Supabase
- [ ] **Real-time collaboration** features

---

**Built with ❤️ by the M365 Show team**

*Empowering businesses with accurate Power Platform cost estimation and professional project proposals.*