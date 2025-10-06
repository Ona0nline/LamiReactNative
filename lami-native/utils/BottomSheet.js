// BottomSheetContainer.js
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetContainer = forwardRef(({ initialContent = null }, ref) => {
    const sheetRef = useRef(null);
    const snapPoints = ['10%', '50%'];

    const [content, setContent] = React.useState(initialContent);

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
        show: (newContent) => {
            setContent(newContent);          // update content dynamically
            sheetRef.current?.expand();      // open the sheet
        },
        hide: () => sheetRef.current?.close(),
    }));

    return (
        <BottomSheet ref={sheetRef} index={-1} snapPoints={snapPoints}>
            <View style={styles.sheetContent}>
                {content}
            </View>
        </BottomSheet>
    );
});

const styles = StyleSheet.create({
    sheetContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BottomSheetContainer;
