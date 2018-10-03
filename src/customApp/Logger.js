import { message } from "../../node_modules/antd";

// const Rollbar =  window.Rollbar;
export function configure (){
    // Rollbar.configure(...arguments);
}
export function critical (){
    // Rollbar.critical(...arguments); 
    console.log("[CRITICAL] : "+ message)
}
export function error (){
    // Rollbar.error(...arguments); 
    console.log("[ERROR] : "+ message)
}
export function warning (){
    // Rollbar.warning(...arguments); 
    console.log("[WARNING] : "+ message)
}
export function info (){
    // Rollbar.info(...arguments); 
    console.log("[INFO] : "+ message)
}
export function debug(){
    // Rollbar.debug(...arguments); 
    console.log("[DEBUG] : "+ message)
}    