import { createBrowserRouter, Navigate } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BookAppointment from "../pages/BookAppointment";
import Profile from "../pages/Profile";
import SearchClinics from "../pages/SearchClinics";
import AuthInitializer from "../componnents/AuthInitializer";
import ProtectedRoute from "./ProtectedRoute";
import Forbidden from "../pages/Forbidden";
import NotFound from "../pages/NotFound";
import ClinicPage from "../pages/ClinicPage";
import Layout from "../componnents/Layout";
import BookingConfirm from "../pages/BookingConfirm";
import HomeEntry from "../pages/HomeEntry";
import MyAppointments from "../pages/MyAppointments";
import ManageAliveQueue from "../pages/ManageAliveQueue";
import ManageAppointments from "../pages/ManageAppointments";
import ManageProviders from "../pages/ManageProviders";
import CreateNewProvider from "../pages/CreateNewProvider";
import AliveQueue from "../pages/AliveQueue";
import WorkingHours from "../pages/WorkingHours";
import ProfileDetails from "../pages/ProfileDetails";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <AuthInitializer />,
        children: [{
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "home-entry",
                    element: <HomeEntry />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "book-appointment",
                    element: (
                        <ProtectedRoute roles={["CLIENT"]}>
                            <BookAppointment />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "profile",
                    element: (
                        <ProtectedRoute roles={["CLIENT"]}>
                            <Profile />
                        </ProtectedRoute>
                    ),
                    children: [
                        {
                            index: true,
                            element: <Navigate to="my-appointments" replace />
                        },
                        {
                            path: "my-appointments",
                            element:
                                <ProtectedRoute roles={["CLIENT"]}>
                                    <MyAppointments />
                                </ProtectedRoute>
                        },
                        {
                            path: "profile-details",
                            element:
                                <ProtectedRoute roles={["CLIENT"]}>
                                    <ProfileDetails />
                                </ProtectedRoute>
                        },
                    ]
                },
                {
                    path: "clinics",
                    element: <SearchClinics />,
                },
                {
                    path: "forbidden",
                    element: <Forbidden />,
                },
                {
                    path: "*",
                    element: <NotFound />,
                },
                {
                    path: "clinics/:clinicId",
                    element: <ClinicPage />,
                },
                {
                    path: "clinics/:clinicId/book-appointment/:providerId",
                    element:
                        <ProtectedRoute roles={["CLIENT"]}>
                            <BookAppointment />
                        </ProtectedRoute>
                },
                {
                    path: "booking-confirm",
                    element:
                        <ProtectedRoute roles={["CLIENT"]}>
                            <BookingConfirm />
                        </ProtectedRoute>
                },
                {
                    path: "alive-queue/:providerId",
                    element:
                        <AliveQueue />
                },
                {
                    path: "manage/alive-queue",
                    element:
                        <ProtectedRoute roles={["CLINIC_MANAGER"]}>
                            <ManageAliveQueue />
                        </ProtectedRoute>
                },
                {
                    path: "manage/queues",
                    element:
                        <ProtectedRoute roles={["CLINIC_MANAGER"]}>
                            <ManageAppointments />
                        </ProtectedRoute>
                },
                {
                    path: "manage/providers",
                    element:
                        <ProtectedRoute roles={["CLINIC_MANAGER"]}>
                            <ManageProviders />
                        </ProtectedRoute>
                },
                {
                    path: "manage/providers/create",
                    element:
                        <ProtectedRoute roles={["CLINIC_MANAGER"]}>
                            <CreateNewProvider />
                        </ProtectedRoute>
                },
                {
                    path: "manage/working-hours",
                    element:
                        <ProtectedRoute roles={["CLINIC_MANAGER"]}>
                            <WorkingHours />
                        </ProtectedRoute>
                },
            ]
        }

        ]
    }
])

export default routes

