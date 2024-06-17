const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
    const config = await getDefaultConfig(__dirname);

    // Add custom resolver options if needed
    config.resolver.assetExts.push('png');

    return config;
})();
