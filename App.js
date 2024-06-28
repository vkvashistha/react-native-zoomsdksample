import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import ZoomUs from 'react-native-zoom-us';

// Custom hook for Zoom functionality
const useZoom = () => {
  const [zoomInitialized, setZoomInitialized] = useState(false);

  useEffect(() => {
    const initializeZoom = async () => {
      try {
        // Initialize Zoom SDK
        await ZoomUs.initialize({
          jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBLZXkiOiJPNGpsS1hoX1RMNlJwQVZTaTN1azBnIiwiaWF0IjoxNzE5MzMxODc2NTcxLCJleHAiOjE3MTk1MDM5Njc1MTYsInRva2VuRXhwIjoxNzE5NTAzOTY3NTE2fQ.jCS4hOVo0UeRupVJKMdMfABsynESA9mxYl9wqdQD89w',
          domain: 'zoom.us',
        }, {
          disableShowVideoPreviewWhenJoinMeeting: true,
          enableCustomizedMeetingUI: true,
        });
        setZoomInitialized(true);
      } catch (error) {
        console.error('Error initializing Zoom:', error);
      }
    };

    initializeZoom();
  }, []);

  const startMeeting = async () => {
    try {
      await ZoomUs.startMeeting({
        userName: 'Johny',
        meetingNumber: '12345678',
        zoomAccessToken: 'your_zak_token_here',
        userType: 2,
      });
    } catch (error) {
      console.error('Error starting meeting:', error);
    }
  };

  const joinMeeting = async () => {
    try {
      await ZoomUs.joinMeeting({
        userName: 'Johny',
        meetingNumber: '12345678',
        password: '1234',
        noAudio: false,
        noVideo: false,
      });
    } catch (error) {
      console.error('Error joining meeting:', error);
    }
  };

  const leaveMeeting = async () => {
    try {
      await ZoomUs.leaveMeeting();
    } catch (error) {
      console.error('Error leaving meeting:', error);
    }
  };

  return {
    zoomInitialized,
    startMeeting,
    joinMeeting,
    leaveMeeting,
  };
};

// Main App component
export default function App() {
  const { zoomInitialized, startMeeting, joinMeeting, leaveMeeting } = useZoom();

  return (
    <View style={styles.container}>
      <Text>Welcome to the Zoom integration example!</Text>
      <Button
        title="Start Meeting"
        onPress={startMeeting}
        disabled={!zoomInitialized}
      />
      <Button
        title="Join Meeting"
        onPress={joinMeeting}
        disabled={!zoomInitialized}
      />
      <Button
        title="Leave Meeting"
        onPress={leaveMeeting}
        disabled={!zoomInitialized}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
