export interface ProductsState {
    [key: string]: ProductType
}

export type ProductType = {
        "productId": {
            "value": string
          },
          "name": string,
          "upcCode": string,
          "price": number,
          "description": string,
          "imageUrl": string,
          "stepSize": number,
          "unitType": string,
          "subtitle": string,
          "brand": string,
          "storeSource": string,
          "category": string,
          "subcategory": string,
          "inventoryOnHand": number,
          "isEssential": boolean,
          "deliverableNextDay": boolean,
          "perHomeMaximum": number,
          "enabled": boolean,
          "inventoryHeld": number,
          "weeklyConsumptionQuantity": number,
          "subsubcategory": string,
          "defaultTrackedItemSectionType": number,
          "internalUnitQuantity": number,
          "internalUnitMeasure": number,
          "productUrl": string,
          "itemType": string,
          "perishabilityDays": number,
          "isExplicitCaseQuantityRequired": boolean
    }
