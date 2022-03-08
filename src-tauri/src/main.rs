#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;

#[derive(Default)]
struct StrState {
    s: std::sync::Mutex<String>,
}

// remember to call `.manage(MyState::default())`
#[tauri::command]
async fn get_str(state: tauri::State<'_, StrState>) -> Result<String, String> {
    *state.s.lock().unwrap() = format!("{}a", state.s.lock().unwrap());
    Ok(state.s.lock().unwrap().to_string())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            app.get_window("main").unwrap().open_devtools();

            Ok(())
        })
        .manage(StrState::default())
        .invoke_handler(tauri::generate_handler![get_str])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
