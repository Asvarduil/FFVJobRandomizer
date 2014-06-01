var Classes = {
	Bare: "Freelancer",
	
	Kn: "Knight",
	Bz: "Berserker",
	Mi: "Mime",
	Mk: "Monk",
	Sm: "Samurai",
	Nj: "Ninja",
	Dr: "Dragoon",
	Th: "Thief",
	Rg: "Ranger",
	Bd: "Bard",
	Da: "Dancer",
	Tr: "Trainer/Beastmaster",
	Ch: "Chemist",
	
	En: "Mystic Knight/Enchanter",
	BM: "Black Mage",
	WM: "White Mage",
	Bl: "Blue Mage",
	RM: "Red Mage",
	TM: "Time Mage",
	Su: "Summoner",
	Gm: "Geomancer"
};

var AllClasses = [
	Classes.Th,
	Classes.Mk,
	Classes.Kn,
	Classes.En,
	Classes.Bz,
	Classes.Nj,
	Classes.Tr,
	Classes.Rg,
	Classes.Sm,
	Classes.Dr,
	
	Classes.WM,
	Classes.BM,
	Classes.Bl,
	Classes.RM,
	Classes.TM,
	Classes.Su,
	Classes.Gm,
	Classes.Bd,
	Classes.Da,
	Classes.Ch,
	
	Classes.Mi
]

var ClassicClasses = [
	Classes.Kn,
	Classes.Mk,
	Classes.Th,
	Classes.WM,
	Classes.BM,
	Classes.RM
];

var Team750Classes = [
	Classes.WM,
	Classes.BM,
	Classes.Bl,
	Classes.RM,
	Classes.TM,
	Classes.Su,
	Classes.Gm,
	Classes.Bd,
	Classes.Da,
	Classes.Ch
];

var Non750Classes = [
	Classes.Th,
	Classes.Mk,
	Classes.Kn,
	Classes.En,
	Classes.Bz,
	Classes.Nj,
	Classes.Tr,
	Classes.Rg,
	Classes.Sm,
	Classes.Dr
];

var WindClasses = [
	Classes.Kn,
	Classes.Mk,
	Classes.Th,
	Classes.BM,
	Classes.WM,
	Classes.Bl
];

var WaterClasses = [
	Classes.Bz,
	Classes.En,
	Classes.RM,
	Classes.TM,
	Classes.Su,
	Classes.Mi
];

var FireClasses = [
	Classes.Rg,
	Classes.Nj,
	Classes.Tr,
	Classes.Gm,
	Classes.Bd
];

var EarthClasses = [
	Classes.Sm,
	Classes.Dr,
	Classes.Da,
	Classes.Ch
];

$(document).ready(function () {
	var $runs = $('#run-types'),
		$normalRun = $('#normal-run'),
		$classicRun = $('#classic-run'),
		$team750Run = $('#team-750-run'),
		$non750Run = $('#non-750-run'),
		$randomRun = $('#random-run'),
		
		$restrictions = $('#restriction-types'),
		$noRestriction = $('#no-restriction'),
		$naturalRestriction = $('#natural-restriction'),
		
		$risks = $('#risk-types'),
		$noRisk = $('#no-risk'),
		$zerkerRisk = $('#zerker-risk'),
		
		$classicMode = $('#classic-classes'),
		$classicGenerate = $('#generate-classic-classes'),
		$bartzClass = $('#bartz-class'),
		$galufClass = $('#galuf-class'),
		$reinaClass = $('#reina-class'),
		$farisClass = $('#faris-class'),
		
		$crystalMode = $('#crystal-classes'),
		$windGenerate = $('#generate-wind-class'),
		$waterGenerate = $('#generate-water-class'),
		$fireGenerate = $('#generate-fire-class'),
		$earthGenerate = $('#generate-earth-class'),
		$windClass = $('#wind-class'),
		$waterClass = $('#water-class'),
		$fireClass = $('#fire-class'),
		$earthClass = $('#earth-class'),
		
		runType = 'random',
		restrictionType = 'none',
		riskType = 'none';
	
	// Run Events -----------------------------------------------------
	$normalRun.click(function (e) {
		e.preventDefault();
		$runs.addClass('hidden');
		$restrictions.removeClass('hidden');
		
		runType = 'normal';
	});
	
	$classicRun.click(function (e) {
		e.preventDefault();
		$runs.addClass('hidden');
		$classicMode.removeClass('hidden');
		
		runType = 'classic';
		restrictionType = 'none';
		riskType = 'none';
	});
	
	$team750Run.click(function (e) {
		e.preventDefault();
		$runs.addClass('hidden');
		$restrictions.removeClass('hidden');
		
		runType = 'team750';
	});
	
	$non750Run.click(function (e) {
		e.preventDefault();
		$runs.addClass('hidden');
		$restrictions.removeClass('hidden');
		
		runType = 'non750';
	});
	
	$randomRun.click(function (e) {
		e.preventDefault();
		$runs.addClass('hidden');
		$restrictions.removeClass('hidden');
		
		runType = 'random';
	});
	
	// End of Run Events ----------------------------------------------
	// Restriction Events ---------------------------------------------
	
	$noRestriction.click(function (e) {
		e.preventDefault();
		
		$restrictions.addClass('hidden');
		$risks.removeClass('hidden');
		
		restrictionType = 'none';
	});
	
	$naturalRestriction.click(function (e) {
		e.preventDefault();
		
		$restrictions.addClass('hidden');
		$risks.removeClass('hidden');
		
		restrictionType = 'natural';
	});
	
	// End of Restriction Events --------------------------------------
	// Risk Events ----------------------------------------------------
	
	$noRisk.click(function (e) {
		e.preventDefault();
		
		$risks.addClass('hidden');
		$crystalMode.removeClass('hidden');
		
		riskType = 'none';
	});
	
	$zerkerRisk.click(function (e) {
		e.preventDefault();
		
		$risks.addClass('hidden');
		$crystalMode.removeClass('hidden');
		
		riskType = 'zerker';
	});
	
	// End of Risk Events ---------------------------------------------
	// Classic Events -------------------------------------------------
	
	$classicGenerate.click(function (e) {
		e.preventDefault();
		
		// 'Red Mage' rule - As RM is a water crystal class,
		// only one character can ever have it.
		var classes = [],
			canRollRedMage = true;
		for(var i = 0; i < 4; i++)
		{
			var charClass = generateClassicClass(canRollRedMage);
			if(charClass == Classes.RM)
				canRollRedMage = false;
				
			classes.push(charClass);
		}
			
		$bartzClass.html(classes[0]);
		$reinaClass.html(classes[1]);
		$galufClass.html(classes[2]);
		$farisClass.html(classes[3]);
	});
	
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function removeArrayItem(arr, item) {
		var removeCounter = 0;

		for (var index = 0; index < arr.length; index++) {
			if (arr[index] === item) {
				arr.splice(index, 1);
				removeCounter++;
				index--;
			}
		}

		return removeCounter;
	}
	
	function getArrayIntersection(a, b)
	{
		var result = [];
		
		for(var ai = 0; ai < a.length; ai++) {
			var aVal = a[ai];
			
			for(var bi = 0; bi < b.length; bi++) {
				var bVal = b[bi];
				if(aVal == bVal) {
					result.push(bVal);
					break;
				}
			}
		}
		
		return result;
	}
	
	function generateTeam750Class(collection) {
		if(runType != 'team750')
			return collection;
			
		var result = getArrayIntersection(collection, Team750Classes);
		console.log('Team 750 class collection: ' + result);
		
		return result;
	}
	
	function generateNonTeam750Class(collection) {
		if(runType != 'non750')
			return collection;
			
		var result = getArrayIntersection(collection, Non750Classes);
		console.log('Non-Team 750 class collection: ' + result);
		
		return result;
	}
	
	function berzerkerRisk(collection) {
		if(riskType != 'zerker')
			return;
			
		collection.push(Classes.Bz);
	}
	
	function generateClassFromCollection(crystalClassCollection) {
		// Trace code, for debugging purposes.
		console.log('Run: ' + runType);
		console.log('Risk: ' + riskType);
		console.log('Restriction: ' + restrictionType);
			
		var collection = crystalClassCollection.slice(0);
		console.log('Passed-in class collection: ' + collection);
		
		collection = generateTeam750Class(collection);
		collection = generateNonTeam750Class(collection);
		berzerkerRisk(collection);
		
		console.log('Final class collection: ' + collection);
		
		var classId = getRandomInt(0, collection.length - 1);
		var charClass = collection[classId];
		
		console.log('Generated class: ' + charClass);
		
		return charClass;
	}
	
	function generateClassicClass(canRollRedMage) {
		var collection = ClassicClasses.slice(0);
		
		// 'Red Mage' rule - As RM is a water crystal class,
		// only one character can ever have it.
		if(! canRollRedMage) {
			removeArrayItem(collection, Classes.RM);
		}
		
		return generateClassFromCollection(collection, 'none', 'none');
	}
	
	// End of Classic Events ------------------------------------------
	// Random Events --------------------------------------------------
	
	$windGenerate.click(function (e) {
		e.preventDefault();
		
		console.log('Bartz/Wind class generation starting.');
		var charClass = (restrictionType == 'natural')
			? charClass = generateClassFromCollection(WindClasses)
			: charClass = generateClassFromCollection(AllClasses);
			
		$windClass.html(charClass);
	});
	
	$waterGenerate.click(function (e) {
		e.preventDefault();
		
		console.log('Reina/Water class generation starting.');
		var charClass = (restrictionType == 'natural')
			? charClass = generateClassFromCollection(WaterClasses)
			: charClass = generateClassFromCollection(AllClasses);
			
		$waterClass.html(charClass);
	});
	
	$fireGenerate.click(function (e) {
		e.preventDefault();
		
		console.log('Faris/Fire class generation starting.');
		var charClass = (restrictionType == 'natural')
			? charClass = generateClassFromCollection(FireClasses)
			: charClass = generateClassFromCollection(AllClasses);
			
		$fireClass.html(charClass);
	});
	
	$earthGenerate.click(function (e) {
		e.preventDefault();
		
		console.log('Galuf/Earth class generation starting.');
		var charClass = (restrictionType == 'natural')
			? charClass = generateClassFromCollection(EarthClasses)
			: charClass = generateClassFromCollection(AllClasses);
			
		$earthClass.html(charClass);
	});
	
	// End of Random Events -------------------------------------------
});