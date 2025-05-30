import { useThemeStore } from "../Store/useThemeStore";
import { Send } from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const isDarkMode = theme === "dark";

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-xl font-bold">Theme Settings</h2>
          <p className="text-sm text-base-content/70">Choose between Light and Dark mode for a better experience</p>
        </div>

        <div className="flex justify-center gap-6">
          <button
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${!isDarkMode ? "bg-primary text-white shadow-md" : "bg-base-200 hover:bg-base-300"}`}
            onClick={() => setTheme("light")}
          >
            ☀️ Light Mode
          </button>
          <button
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? "bg-primary text-white shadow-md" : "bg-base-200 hover:bg-base-300"}`}
            onClick={() => setTheme("dark")}
          >
            🌙 Dark Mode
          </button>
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-xl p-3 shadow-sm bg-base-200">
                      <p className="text-sm">Hey! How's it going?</p>
                      <p className="text-[10px] mt-1.5 text-base-content/70">12:00 PM</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-xl p-3 shadow-sm bg-primary text-primary-content">
                      <p className="text-sm">I'm doing great! Just working on some new features.</p>
                      <p className="text-[10px] mt-1.5 text-primary-content/70">12:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
