// PrivacyAndSecurityScreen.jsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyAndSecurityScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Privacy and Security</Text>

      <Text style={styles.sectionTitle}>Your Privacy Matters</Text>
      <Text style={styles.sectionText}>
        At SafeSpace, we are committed to protecting your privacy. We do not collect personal information without your consent, and we ensure that all data is stored securely.
      </Text>

      <Text style={styles.sectionTitle}>Data Collection</Text>
      <Text style={styles.sectionText}>
        We may collect certain information to improve our services, such as:
      </Text>
      <Text style={styles.bulletPoint}>- User preferences</Text>
      <Text style={styles.bulletPoint}>- Device information</Text>
      <Text style={styles.bulletPoint}>- Usage statistics</Text>

      <Text style={styles.sectionTitle}>Data Security</Text>
      <Text style={styles.sectionText}>
        We take data security seriously. Your data is protected through:
      </Text>
      <Text style={styles.bulletPoint}>- Encryption during transmission</Text>
      <Text style={styles.bulletPoint}>- Regular security audits</Text>
      <Text style={styles.bulletPoint}>- Restricted access to sensitive information</Text>

      <Text style={styles.sectionTitle}>User Rights</Text>
      <Text style={styles.sectionText}>
        You have the right to:
      </Text>
      <Text style={styles.bulletPoint}>- Access your personal data</Text>
      <Text style={styles.bulletPoint}>- Request deletion of your data</Text>
      <Text style={styles.bulletPoint}>- Opt-out of data collection</Text>

      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Text style={styles.sectionText}>
        If you have any questions about our privacy practices, please contact us at support@safespaceapp.com.
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
  bulletPoint: {
    fontSize: 16,
    marginVertical: 4,
    lineHeight: 24,
    paddingLeft: 16,
    textAlign: 'left',
    color: '#555',
  },
});

export default PrivacyAndSecurityScreen;
