module.exports = {
	setupFilesAfterEnv: [
		"@testing-library/jest-native/extend-expect",
	],
	// added testEnvironment to fix some bug 
	testEnvironment: "jsdom",
	roots: [
	  '<rootDir>/',
	],
	testMatch: [
		'**/_components/pages/**/?(*.)+(spec|test).js'
	],
	preset: 'jest-expo',
	"transformIgnorePatterns": [
		"node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)"
	 ]
}