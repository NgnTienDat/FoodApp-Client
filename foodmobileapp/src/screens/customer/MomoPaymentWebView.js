import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MomoPaymentWebView = ({ route }) => {
    const { payUrl } = route.params; // Nhận URL từ API MoMo

    const [loading, setLoading] = useState(true);

    return (
        <View style={styles.container}>
            {loading && (
                <ActivityIndicator
                    style={StyleSheet.absoluteFill}
                    size="large"
                    color="#0000ff"
                />
            )}
            <WebView
                source={{ uri: payUrl }}
                onLoadEnd={() => setLoading(false)}
                startInLoadingState
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MomoPaymentWebView;
