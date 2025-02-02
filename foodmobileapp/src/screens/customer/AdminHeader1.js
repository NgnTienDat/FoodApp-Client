import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
    useAnimatedScrollHandler,
    SharedValue,
    withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;
const HEADER_HEIGHT = 100;
const SEARCH_HEIGHT = 54; // Search container height including padding

const Page = () => {
    const scrollRef = useAnimatedRef();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.5]
                    )
                },
                {
                    scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1])
                }
            ]
        };
    });

    const headerAnimatedStyles = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollOffset.value, [0, IMG_HEIGHT / 2], [0, 1],
            )
        }
    });

    const searchAnimatedStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: Math.max(
                HEADER_HEIGHT,
                interpolate(
                    scrollOffset.value,
                    [0, IMG_HEIGHT - HEADER_HEIGHT],
                    [IMG_HEIGHT, HEADER_HEIGHT]
                )
            ),
            left: 0,
            right: 0,
            zIndex: 2,
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, headerAnimatedStyles]}>
                <Text style={styles.restaurantNameHeader}>HOME</Text>
            </Animated.View>

            

            <Animated.View style={[styles.searchContainer, searchAnimatedStyle]}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm món ăn"
                />
            </Animated.View>


            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={16}
                contentContainerStyle={{
                    paddingTop: IMG_HEIGHT + SEARCH_HEIGHT // Add padding for image and search bar
                }}
            >
                <Animated.Image
                    source={{
                        uri: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302'
                    }}
                    style={[styles.image, imageAnimatedStyle, { position: 'absolute', top: 0 }]}
                />

                <View style={{ backgroundColor: '#fff' }}>
                    <View style={{ height: 2000 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>
                            Parallax Scroll
                        </Text>
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        width: width,
        height: IMG_HEIGHT
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        height: HEADER_HEIGHT,
        zIndex: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    restaurantNameHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 50,
        marginTop: 37
    },
    searchContainer: {
        backgroundColor: '#fff',
        padding: 7,
        width: '100%',
        height: SEARCH_HEIGHT,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
});