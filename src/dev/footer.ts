Callback.addCallback("PostLoaded", () => {

    const x = __config__.getNumber("ButtonPosition.x");
    const y = __config__.getNumber("ButtonPosition.y");
    StartButton.getLocation().set(x < 0 ? ScreenWidth - (-x): x, y < 0 ? ScreenHeight - (-y): y, 64, 64);

    ItemList.addVanillaItems();

    if(isLegacy){
        BehaviorTools.readListOfJson(__packdir__ + "assets/definitions/recipe/").forEach((json: RecipeJsonOld) => {
            if(json.type === "furnace_recipe"){
                for(let i = 0; i < json.tags.length; i++){
                    switch(json.tags[i]){
                        case "blast_furnace": BlastFurnaceRecipe.registerRecipe(json.input, json.output); break;
                        case "smoker": SmokerRecipe.registerRecipe(json.input, json.output); break;
                        case "campfire": CampfireRecipe.registerRecipe(json.input, json.output); break;
                    }
                }
            }
            else if(json.type === "crafting_shapeless"){
                json.tags.some(tag => tag === "stonecutter") && StonecutterRecipe.registerRecipe(json.ingredients[0], json.result);
            }
        });
    }
    else{
        BehaviorTools.readListOfJson(__packdir__ + "assets/behavior_packs/vanilla/recipes/").forEach((json: RecipeJson) => {
            if(json["minecraft:recipe_furnace"]){
                const recipe = json["minecraft:recipe_furnace"];
                for(let i = 0; i < recipe.tags.length; i++){
                    switch(recipe.tags[i]){
                        case "blast_furnace": BlastFurnaceRecipe.registerRecipe(recipe.input, recipe.output); break;
                        case "smoker": SmokerRecipe.registerRecipe(recipe.input, recipe.output); break;
                        case "campfire": CampfireRecipe.registerRecipe(recipe.input, recipe.output); break;
                    }
                }
            }
            /*
            else if(json["minecraft:recipe_brewing_mix"]){
                const recipe = json["minecraft:recipe_brewing_mix"];
                recipe.tags.some(tag => tag === "brewing_stand") && BrewingRecipe.registerRecipe(recipe.input, recipe.reagent, recipe.output);
            }
            */
            else if(json["minecraft:recipe_shapeless"]){
                const recipe = json["minecraft:recipe_shapeless"];
                recipe.tags.some(tag => tag === "stonecutter") && StonecutterRecipe.registerRecipe(recipe.ingredients[0], recipe.result);
            }
        });
    }

});


Callback.addCallback("LevelLoaded", () => {
    ItemList.addModItems();
    ItemList.setup();
    SubUI.setupWindow();
});


ModAPI.registerAPI("RecipeViewer", {
	Core: OldVersion,
    ItemList: ItemList,
    RecipeType: RecipeType,
    RecipeTypeRegistry: RecipeTypeRegistry,
    requireGlobal: (command: string) => eval(command)
});