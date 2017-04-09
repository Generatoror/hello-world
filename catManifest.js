G.DeclareManifest({
name:'test mod manifest',
updates:{
	'Example mod*':'mod.js',//we're updating any mod with a name that begins with "Example mod"
	'Test mod*':'https://rawgit.com/Generatoror/hello-world/master/cookieLegacy.js',
	'Thot mod*':'https://rawgit.com/torcado194/neverending-legacy-mods/master/thot.js'
}
});
