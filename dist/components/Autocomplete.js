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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var material_1 = require("@mui/material");
var styles_1 = require("@mui/styles");
var styles = function () { return (0, styles_1.createStyles)({
    container: {
        minWidth: "200px",
        position: "absolute",
        zIndex: 10
    },
    item: {
        cursor: "pointer"
    }
}); };
var Autocomplete = function (props) {
    var lineHeight = props.lineHeight;
    if (!props.items.length) {
        return null;
    }
    var setTransform = function () {
        var el = document.getElementById("autocomplete-box");
        if (!el)
            return;
        var rect = el.getBoundingClientRect();
        var containerEl = (props === null || props === void 0 ? void 0 : props.parentContainer) && document.getElementById(props.parentContainer);
        var container = { bottom: 0, right: 0 };
        if (containerEl) {
            container = containerEl.getBoundingClientRect();
        }
        else {
            container = {
                bottom: (window.innerHeight || document.documentElement.clientHeight),
                right: (window.innerWidth || document.documentElement.clientWidth)
            };
        }
        var outsideBottom = (props.top + rect.bottom) - container.bottom;
        var outsideRight = (props.left + rect.right) - container.right;
        var xOffset = 0;
        var yOffset = 0;
        if (outsideBottom > 0)
            yOffset = -outsideBottom;
        if (outsideRight > 0)
            xOffset = -outsideRight;
        el.style.top = props.top + (yOffset === 0 ? lineHeight : 0) + "px";
        el.style.left = props.left + xOffset + "px";
        if (yOffset < 0) {
            el.style.transform = "translate(0, -100%)";
        }
        else {
            el.style.transform = "translate(0, 0)";
        }
    };
    (0, react_1.useEffect)(function () {
        setTransform();
    }, [props.top, props.left]);
    var classes = props.classes;
    return (react_1.default.createElement(material_1.Paper, { id: "autocomplete-box", className: classes.container },
        react_1.default.createElement(material_1.List, { dense: true }, props.items.map(function (item, index) { return (react_1.default.createElement(material_1.ListItem, { key: index, className: classes.item, selected: index === props.selectedIndex, onClick: function () { return props.onClick(index); } }, item.content)); }))));
};
exports.default = (0, styles_1.withStyles)(styles, { withTheme: true })(Autocomplete);
//# sourceMappingURL=Autocomplete.js.map