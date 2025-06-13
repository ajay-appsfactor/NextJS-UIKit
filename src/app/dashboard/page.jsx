import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  console.log(userId);

  if (!userId) {
    redirect("/login");
  }
  return (
    <div className="">
      <h1 className="uk-text-danger uk-text-center">Dashboard</h1>
      <p className="uk-text-center">Welcome to the dashboard!</p>
    </div>
  );
};

export default Dashboard;
