import Navigation from "@/components/Dashboard/Navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div className="flex flex-col items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
