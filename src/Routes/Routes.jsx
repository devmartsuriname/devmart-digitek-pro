import {
    createBrowserRouter,
  } from "react-router-dom";
import RootProvider from "../RootProvider";
import Layout2 from "../Layout/Layout2";
import Home3 from "../Pages/Home3";
import AboutPage from "../Pages/AboutPage";
import TeamPage from "../Pages/TeamPage";
import TeamDetailsPage from "../Pages/TeamDetailsPage";
import PricingPage from "../Pages/PricingPage";
import FaqPage from "../Pages/FaqPage";
import ContactPage from "../Pages/ContactPage";
import ServicesPage from "../Pages/ServicesPage";
import ServiceDetailsPage from "../Pages/ServiceDetailsPage";
import CaseStudyPage from "../Pages/CaseStudyPage";
import CaseStudyDetailsPage from "../Pages/CaseStudyDetailsPage";
import BlogRightSidebar from "../Pages/BlogRightSidebar";
import BlogPage from "../Pages/BlogPage";
import BlogDetailsPage from "../Pages/BlogDetailsPage";
import AuthPage from "../Pages/AuthPage";
import AdminLayout from "../Layout/AdminLayout";
import Dashboard from "../Pages/Admin/Dashboard";
import Services from "../Pages/Admin/Services";
import Projects from "../Pages/Admin/Projects";
import Blog from "../Pages/Admin/Blog";
import Team from "../Pages/Admin/Team";
import FAQ from "../Pages/Admin/FAQ";
import Media from "../Pages/Admin/Media";
import Leads from "../Pages/Admin/Leads";
import Settings from "../Pages/Admin/Settings";
import ProtectedRoute from "../Components/Auth/ProtectedRoute";

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
              element: <Home3></Home3>,
            },
        {
            path: "/about",
            element: <AboutPage></AboutPage>,
        },
        {
          path: "/team",
          element: <TeamPage></TeamPage>,
        },   
        {
          path: "/team/team-details",
          element: <TeamDetailsPage></TeamDetailsPage>,
        },   
        {
          path: "/pricing",
          element: <PricingPage></PricingPage>,
        }, 
        {
          path: "/faq",
          element: <FaqPage></FaqPage>,
        },  
        {
          path: "/contact",
          element: <ContactPage></ContactPage>,
        },   
        {
          path: "/service",
          element: <ServicesPage></ServicesPage>,
        }, 
        {
          path: "/service/service-details",
          element: <ServiceDetailsPage></ServiceDetailsPage>,
        }, 
        {
          path: "/project",
          element: <CaseStudyPage></CaseStudyPage>,
        }, 
        {
          path: "/project/project-details",
          element: <CaseStudyDetailsPage></CaseStudyDetailsPage>,
        },   
        {
          path: "/blog-sidebar",
          element: <BlogRightSidebar></BlogRightSidebar>,
        },      
        {
          path: "/blog",
          element: <BlogPage></BlogPage>,
        }, 
        {
          path: "/blog/blog-details",
          element: <BlogDetailsPage></BlogDetailsPage>,
        },                                                                             
          ],
        },
        {
          path: "/auth",
          element: <AuthPage></AuthPage>,
        },
        {
          path: "/admin",
          element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
          children: [
            {
              path: "dashboard",
              element: <Dashboard></Dashboard>,
            },
            {
              path: "services",
              element: <Services></Services>,
            },
            {
              path: "projects",
              element: <Projects></Projects>,
            },
            {
              path: "blog",
              element: <Blog></Blog>,
            },
            {
              path: "team",
              element: <Team></Team>,
            },
            {
              path: "faq",
              element: <FAQ></FAQ>,
            },
            {
              path: "media",
              element: <Media></Media>,
            },
            {
              path: "leads",
              element: <Leads></Leads>,
            },
            {
              path: "settings",
              element: <Settings></Settings>,
            },
          ],
        },
      ],
    },
  ]);