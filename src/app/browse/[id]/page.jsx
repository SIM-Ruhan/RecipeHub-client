// import React from 'react';

// const RecipeDetailsPage = async({params}) => {
// const id = await params;
//     return (
//         <div>
//             id:  {id}
//         </div>
//     );
// };

// export default RecipeDetailsPage;
import { getRecipeId } from '@/lib/api';
import React from 'react';
const RecipeDetailsPage = async ({ params }) => {
    const {id} = await params;
    const recipe = await getRecipeId(id)

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Recipe Details</h1>
            <p className="mt-4">
                You are viewing recipe with ID: <span className="font-mono bg-gray-100 p-1">{recipeId}</span>
            </p>
        </div>
    );
};

export default RecipeDetailsPage;