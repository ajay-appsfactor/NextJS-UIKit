import AppSidebar from "@/components/AppSidebar";

export default function Layout({ children }) {
  return (
    <div uk-grid="true" className="uk-flex">
      <div className="uk-width-1-5">
        {/* App Sidebar */}
        <AppSidebar />
      </div>

      <main className="uk-background-muted uk-width-3-3">
        <div className="">{children}</div>
      </main>
    </div>
  );
}
