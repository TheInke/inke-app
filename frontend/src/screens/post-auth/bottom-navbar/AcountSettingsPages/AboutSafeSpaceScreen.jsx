import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';


const AboutSafeSpaceScreen = () => {
 return (
   <ScrollView contentContainerStyle={styles.container}>
     <Text style={styles.title}>About Us</Text>


     <Text style={styles.sectionTitle}>Our Mission</Text>
     <Text style={styles.sectionText}>
       At SafeSpace, our mission is to create a secure and supportive environment for individuals to share their experiences and connect with others. We believe in the power of community and strive to foster trust and understanding through our platform.
     </Text>


     <Text style={styles.sectionTitle}>Our Team</Text>
     <Text style={styles.sectionText}>
       We are a dedicated team of professionals passionate about mental health and technology. Our diverse backgrounds and expertise enable us to continuously improve our app and provide users with the best possible experience.
     </Text>


     <Text style={styles.sectionTitle}>Contact Us</Text>
     <Text style={styles.sectionText}>
       We love hearing from our users! If you have any questions, suggestions, or feedback, please reach out to us at:
     </Text>
     <Text style={styles.email}>support@safespaceapp.com</Text>
    
     <Text style={styles.sectionTitle}>Follow Us</Text>
     <Text style={styles.sectionText}>
       Stay updated with the latest news and updates from SafeSpace by following us on social media:
     </Text>
     <Text style={styles.socialMedia}>
       - Facebook: SafeSpaceApp
     </Text>
     <Text style={styles.socialMedia}>
     - Twitter: @SafeSpaceApp
     </Text>
     <Text style={styles.socialMedia}>
       - Instagram: @safespace_app
     </Text>
   </ScrollView>
 );
};


const styles = StyleSheet.create({
 container: {
   padding: 16,
   backgroundColor: '#fff',
 },
 title: {
   fontSize: 24,
   fontWeight: 'bold',
   marginBottom: 16,
 },
 sectionTitle: {
   fontSize: 20,
   fontWeight: 'bold',
   marginTop: 16,
 },
 sectionText: {
   fontSize: 16,
   marginVertical: 8,
   lineHeight: 24,
 },
 email: {
   fontSize: 16,
   marginVertical: 8,
   lineHeight: 24,
   color: '#007BFF',
 },
 socialMedia: {
   fontSize: 16,
   marginVertical: 4,
   lineHeight: 24,
 },
});


export default AboutSafeSpaceScreen; // Export the component