import Navigation from "@/components/Dashboard/Navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
