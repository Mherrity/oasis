"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModalButton = void 0;
const react_1 = __importStar(require("react"));
const Button_1 = require("./Button");
const useWalletModal_1 = require("./useWalletModal");
const WalletModalButton = (_a) => {
    var { children = 'Select Wallet', onClick } = _a, props = __rest(_a, ["children", "onClick"]);
    const { visible, setVisible } = (0, useWalletModal_1.useWalletModal)();
    const handleClick = (0, react_1.useCallback)((event) => {
        if (onClick)
            onClick(event);
        if (!event.defaultPrevented)
            setVisible(!visible);
    }, [onClick, visible]);
    return (react_1.default.createElement(Button_1.Button, Object.assign({ className: "wallet-adapter-button-trigger", onClick: handleClick }, props), children));
};
exports.WalletModalButton = WalletModalButton;
//# sourceMappingURL=WalletModalButton.js.map