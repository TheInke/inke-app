import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';


export default function TabThreeScreen() 
{
    return(
    /* 
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
    headerImage={<Ionicons size={200} name="code-slash" style={styles.headerImage} />}>
    </ParallaxScrollView>
    */
    <View style={styles.container}>
    </View>
    )
}

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        margin: 10,

        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 10,

    }
    
})