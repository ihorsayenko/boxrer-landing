export interface PackageModel {
    // PackageMaterials: {
    //     Boxes: {
    //         id: String,
    //         imgSrc: String,
    //         description: Array<string>,
    //         price: Number,
    //     }
    // }

    id: string;
    imgSrc: string;
    description: string[];
    price: string;
    count: Number;
}