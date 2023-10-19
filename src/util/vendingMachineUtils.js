import { products } from "../data/products";

// Determine if the vending machine is already full
export function isMachineAlreadyFull(currentProducts) {
    const productQuantity = currentProducts.reduce(
        (quantity, currentProduct) => currentProduct.quantity + quantity,
        0
    );
    return productQuantity === getMaxProductQuantity();
}

// Get the maximum product quantity available in the vending machine
function getMaxProductQuantity() {
    return products.reduce((quantity, product) => product.quantity + quantity, 0);
}

// Calculate the current energy consumption based on component status
export function getCurrentEnergyConsumption(components) {
    let currentConsumption = 0;

    components.forEach((c) => {
        if (c.status === 1) currentConsumption += c.energyConsumption;
    });

    return currentConsumption;
}

// Determine if the heater or cooler should be triggered
export function shouldTriggerHeaterOrCooler(components) {
    return (
        components[0].status === 0 &&
        components[1].status === 0 &&
        components[3].status === 0
    );
}

// Toggle the heater and cooler components based on the mode (cool/heating)
export function toggleHeaterAndCooler(components, mode) {
    return components.map((c) => {
        if (c.id === 0) {
            c.status = mode === "cool" ? 1 : 0;
        } else if (c.id === 1) {
            c.status = mode === "cool" ? 0 : 1;
        }
        return c;
    });
}

// Update the status of the lighting component
export function updateComponentsLights(components, lightsOpen) {
    return components.map((c) => {
        if (c.id === 2) {
            return {...c, status: lightsOpen };
        } else {
            return c;
        }
    });
}

// Update component status when a cancel request is made
export function updateComponentsForCancelRequest(components) {
    return components.map((c) => {
        if (c.id === 0 || c.id === 1 || c.id === 3) {
            c.status = 0;
        }
        return c;
    });
}

// Update component status when a product is selected
export function updateComponentsForSelectProduct(components) {
    return components.map((c) => {
        if (c.id === 0 || c.id === 1) {
            c.status = 0;
        } else if (c.id === 3) {
            c.status = 1;
        }
        return c;
    });
}

// Update component status when a selected product is given
export function updateComponentsForGiveSelectedProduct(components) {
    return components.map((c) => {
        if (c.id === 0 || c.id === 1 || c.id === 3) {
            c.status = 0;
        }
        return c;
    });
}

// Decrease the quantity of the selected product in the current products list
export function decreaseSelectedProductQuantity(currentProducts, selectedProduct) {
    return currentProducts.map((p) => {
        if (p.id === selectedProduct.id) {
            return {
                ...selectedProduct,
                quantity: selectedProduct.quantity - 1,
            };
        } else {
            return p;
        }
    });
}