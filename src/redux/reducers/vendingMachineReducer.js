import { products } from "../../data/products";
import { components } from "../../data/components";
import {
    updateComponentsLights,
    updateComponentsForCancelRequest,
    updateComponentsForSelectProduct,
    updateComponentsForGiveSelectedProduct,
    decreaseSelectedProductQuantity,
    toggleHeaterAndCooler,
} from "../../util/vendingMachineUtils";

const initialMachineState = {
    userBalance: 0,
    machineBalance: 0,
    products: products,
    selectedProduct: null,
    robotArmSpinning: false,
    components: components,
};

const vendingMachineReducer = (state = initialMachineState, action) => {
    switch (action.type) {
        case "INSERT_MONEY":
            return {
                ...state,
                userBalance: state.userBalance + action.payload,
            };
        case "CANCEL_REQUEST":
            return {
                ...state,
                robotArmSpinning: false,
                components: updateComponentsForCancelRequest(state.components),
            };
        case "SELECT_PRODUCT":
            const product = action.payload;
            return {
                ...state,
                selectedProduct: product,
                robotArmSpinning: true,
                components: updateComponentsForSelectProduct(state.components),
            };
        case "GIVE_SELECTED_PRODUCT":
            return {
                ...state,
                userBalance: state.userBalance - state.selectedProduct.price,
                machineBalance: state.machineBalance + state.selectedProduct.price,
                products: decreaseSelectedProductQuantity(
                    state.products,
                    state.selectedProduct
                ),
                components: updateComponentsForGiveSelectedProduct(state.components),
                robotArmSpinning: false,
            };
        case "GIVE_REFUND":
            return {
                ...state,
                userBalance: 0,
                components: updateComponentsLights(state.components, 0),
            };
        case "RESET_MACHINE":
            return {
                ...state,
                products: products,
            };
        case "COLLECT_MONEY":
            return {
                ...state,
                machineBalance: 0,
            };
        case "ADJUST_HEATER_COOLER":
            const mode = action.payload;
            return {
                ...state,
                components: toggleHeaterAndCooler(state.components, mode),
            };
        case "LIGHTS_ON":
            return {
                ...state,
                components: updateComponentsLights(state.components, 1),
            };
        case "LIGHTS_OFF":
            return {
                ...state,
                components: updateComponentsLights(state.components, 0),
            };
        default:
            return state;
    }
};

export default vendingMachineReducer;