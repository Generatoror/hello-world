G.AddData({
name:'Test mod',
author:'????',
desc:'A simple test mod that adds cookies',
engineVersion:1,
manifest:'modManifest.js',
requires:['Default dataset*'],
sheets:{'spicySheet':'img/spicyModIconSheet.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{

	new G.Res({
		name:'wheat',
		desc:'[wheat] is not very tasty nor healthy',
		icon:[0,0,'spicySheet'],
		turnToByContext:{'eat':{'health':0.01,'happiness':0.01},'decay':{'spoiled food':0.5}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'cookie',
		desc:'Made from [water] and the [wheat], this [cookie] and gets popular easily.',
		icon:[1,0,'spicySheet'],
		turnToByContext:{'eat':{'health':0.005,'happiness':1},'decay':{'cookie':0.95,'spoiled food':0.05}},//that last part makes hot sauce effectively have a 95% chance of simply not rotting (in effect, it decays into itself)
		partOf:'food',
		category:'food',
	});
	
	//Then we augment the base data to incorporate our new resources :
		//adding hot pepper as something that can be gathered from grass
	G.getDict('grass').res['gather']['wheat']=3;
		//adding a new mode to artisans so they can make hot sauce from hot peppers
	G.getDict('furnance').modes['cookie']={name:'Make cookies',desc:'Turn 5 [wheat] and 2 [water] into 1 [cookie].',req:{'cookie preparing':true}};
		//adding a new effect to artisans that handles the actual hot sauce preparing and is only active when the unit has the mode "hot sauce"
	G.getDict('furnance').effects.push({type:'convert',from:{'wheat':5,'water':2},into:{'cookie':2},every:5,mode:'cookie'});
	
	//Then we add a new technology which is required by the artisans to gain access to the "hot sauce" mode :
	new G.Tech({
		name:'cookie preparing',
		desc:'@[furnance]s can now produce [cookie]s from [wheat] and [water]//This special recipe allows a skilled craftsman to fully express the complex aromas present in hot peppers.',
		icon:[0,1,'spicySheet'],
		cost:{'insight':15},
		req:{'cooking':true},
	});
        new G.Tech({
		name:'healthy cookies',
		desc:'@[cookie]s are now twice as healthy.',
		icon:[0,1,'spicySheet'],
		cost:{'insight':15},
		req:{'cooking':true},
                effects:[
			{type:'function',func:function(){G.getDict('cookie').turnToByContext['eat']['health']=0.1;}},//this is a custom function executed when we gain the trait
		],
	});
	
	//Finally, we add a trait that amplifies the benefits of consuming hot sauce; it will take on average 20 years to appear once the conditions (knowing the "Hot sauce preparing" tech) is fulfilled.
	new G.Trait({
		name:'Grandma´s love',
		desc:'@[elder]s now give you cookies',
		icon:[1,1,'spicySheet'],
		chance:5,
		req:{'cookie preparing':true},
		effects:[
			{type:'function',func:function(){G.getDict('elder').effects.push({type:'convert',from:{'wheat':2,'water':1},into:{'cookie':1},every:25,mode:'cookie'})},//this is a custom function executed when we gain the trait
		
	});
	
	//There are many other ways of adding and changing content; refer to /data.js, the default dataset, if you want to see how everything is done in the base game. Good luck!
}
});
