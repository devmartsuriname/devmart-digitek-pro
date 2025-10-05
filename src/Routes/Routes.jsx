import { lazy, Suspense } from 'react';
import { createBrowserRouter } from "react-router-dom";
import RootProvider from "../RootProvider";
import Layout2 from "../Layout/Layout2";
import AdminLayout from "../Layout/AdminLayout";
import ProtectedRoute from "../Components/Auth/ProtectedRoute";
import { PageSkeleton, AdminSkeleton } from "../Components/Common/LoadingSkeleton";

// Lazy load all page components
const Home3 = lazy(() => import("../Pages/Home3"));
const AboutPage = lazy(() => import("../Pages/AboutPage"));
const TeamPage = lazy(() => import("../Pages/TeamPage"));
const TeamDetailsPage = lazy(() => import("../Pages/TeamDetailsPage"));
const PricingPage = lazy(() => import("../Pages/PricingPage"));
const FaqPage = lazy(() => import("../Pages/FaqPage"));
const ContactPage = lazy(() => import("../Pages/ContactPage"));
const ServicesPage = lazy(() => import("../Pages/ServicesPage"));
const ServiceDetailsPage = lazy(() => import("../Pages/ServiceDetailsPage"));
const CaseStudyPage = lazy(() => import("../Pages/CaseStudyPage"));
const CaseStudyDetailsPage = lazy(() => import("../Pages/CaseStudyDetailsPage"));
const BlogRightSidebar = lazy(() => import("../Pages/BlogRightSidebar"));
const BlogPage = lazy(() => import("../Pages/BlogPage"));
const BlogDetailsPage = lazy(() => import("../Pages/BlogDetailsPage"));
const AuthPage = lazy(() => import("../Pages/AuthPage"));
const NotFound = lazy(() => import("../Pages/NotFound"));

// Admin pages
const Dashboard = lazy(() => import("../Pages/Admin/Dashboard"));
const Services = lazy(() => import("../Pages/Admin/Services"));
const Projects = lazy(() => import("../Pages/Admin/Projects"));
const Blog = lazy(() => import("../Pages/Admin/Blog"));
const Team = lazy(() => import("../Pages/Admin/Team"));
const FAQ = lazy(() => import("../Pages/Admin/FAQ"));
const Media = lazy(() => import("../Pages/Admin/Media"));
const Leads = lazy(() => import("../Pages/Admin/Leads"));
const Settings = lazy(() => import("../Pages/Admin/Settings"));

// SEO pages
const Sitemap = lazy(() => import("../Pages/Sitemap"));

export const router = createBrowserRouter([
    {
      path: "/",
      element: <RootProvider />,
      children: [
        {
          path: "/",
          element: <Layout2></Layout2>,
          children: [
            {
              index: true,
              element: <Suspense fallback={<PageSkeleton />}><Home3 /></Suspense>,
            },
            {
              path: "/about",
              element: <Suspense fallback={<PageSkeleton />}><AboutPage /></Suspense>,
            },
            {
              path: "/team",
              element: <Suspense fallback={<PageSkeleton />}><TeamPage /></Suspense>,
            },   
            {
              path: "/team/team-details",
              element: <Suspense fallback={<PageSkeleton />}><TeamDetailsPage /></Suspense>,
            },   
            {
              path: "/pricing",
              element: <Suspense fallback={<PageSkeleton />}><PricingPage /></Suspense>,
            }, 
            {
              path: "/faq",
              element: <Suspense fallback={<PageSkeleton />}><FaqPage /></Suspense>,
            },  
            {
              path: "/contact",
              element: <Suspense fallback={<PageSkeleton />}><ContactPage /></Suspense>,
            },   
            {
              path: "/service",
              element: <Suspense fallback={<PageSkeleton />}><ServicesPage /></Suspense>,
            }, 
            {
              path: "/services/:slug",
              element: <Suspense fallback={<PageSkeleton />}><ServiceDetailsPage /></Suspense>,
            }, 
            {
              path: "/portfolio",
              element: <Suspense fallback={<PageSkeleton />}><CaseStudyPage /></Suspense>,
            }, 
            {
              path: "/portfolio/:slug",
              element: <Suspense fallback={<PageSkeleton />}><CaseStudyDetailsPage /></Suspense>,
            },   
            {
              path: "/blog-sidebar",
              element: <Suspense fallback={<PageSkeleton />}><BlogRightSidebar /></Suspense>,
            },      
            {
              path: "/blog",
              element: <Suspense fallback={<PageSkeleton />}><BlogPage /></Suspense>,
            }, 
            {
              path: "/blog/:slug",
              element: <Suspense fallback={<PageSkeleton />}><BlogDetailsPage /></Suspense>,
            },
            {
              path: "/team/:slug",
              element: <Suspense fallback={<PageSkeleton />}><TeamDetailsPage /></Suspense>,
            },
            {
              path: "/sitemap.xml",
              element: <Suspense fallback={<PageSkeleton />}><Sitemap /></Suspense>,
            },
            {
              path: "*",
              element: <Suspense fallback={<PageSkeleton />}><NotFound /></Suspense>,
            },
          ],
        },
        {
          path: "/auth",
          element: <Suspense fallback={<PageSkeleton />}><AuthPage /></Suspense>,
        },
        {
          path: "/admin",
          element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
          children: [
            {
              path: "dashboard",
              element: <Suspense fallback={<AdminSkeleton />}><Dashboard /></Suspense>,
            },
            {
              path: "services",
              element: <Suspense fallback={<AdminSkeleton />}><Services /></Suspense>,
            },
            {
              path: "projects",
              element: <Suspense fallback={<AdminSkeleton />}><Projects /></Suspense>,
            },
            {
              path: "blog",
              element: <Suspense fallback={<AdminSkeleton />}><Blog /></Suspense>,
            },
            {
              path: "team",
              element: <Suspense fallback={<AdminSkeleton />}><Team /></Suspense>,
            },
            {
              path: "faq",
              element: <Suspense fallback={<AdminSkeleton />}><FAQ /></Suspense>,
            },
            {
              path: "media",
              element: <Suspense fallback={<AdminSkeleton />}><Media /></Suspense>,
            },
            {
              path: "leads",
              element: <Suspense fallback={<AdminSkeleton />}><Leads /></Suspense>,
            },
            {
              path: "settings",
              element: <Suspense fallback={<AdminSkeleton />}><Settings /></Suspense>,
            },
          ],
        },
      ],
    },
  ]);