declare module "react-router-dom"

// for ts to accept jsx modules
declare module '*.jsx' {
    var _: React.ComponentType<any, any>;
    export default _;
}