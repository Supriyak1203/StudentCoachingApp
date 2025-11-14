export default function Sidebar({ activeTab, setActiveTab }) {
  const menu = [
    { name: "Overview", value: "overview" },
    { name: "My Courses", value: "courses" },
    { name: "Attendance", value: "attendance" },
    { name: "Assignments", value: "assignments" },
    { name: "Profile", value: "profile" },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-full p-5">
      <h1 className="text-2xl font-bold mb-10 text-indigo-600">
        Student Dashboard
      </h1>

      {menu.map((item) => (
        <button
          key={item.value}
          onClick={() => setActiveTab(item.value)}
          className={`w-full text-left p-3 rounded-lg mb-2 ${
            activeTab === item.value
              ? "bg-indigo-600 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
