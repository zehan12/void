import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/Avatar";
import { Badge } from "~/components/Badge";

const Profile = () => {
    return (
        <>
            <SafeAreaView>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View className="p-3">
                        <TouchableOpacity>
                            <Image
                                source={{
                                    uri: "https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                                }}
                                className="h-8 w-8 mx-2"
                            />
                        </TouchableOpacity>
                        <View className="mx-4 flex-row justify-between items-center">
                            <View className="flex-1">
                                <Text className="pt-5 text-4xl">Anwar Ehtesham © | Street Lyricist 🇧🇩</Text>
                                <View className="flex flex-row items-center">
                                    <Text className="text-2xl">zehan12</Text>
                                    <Badge className="mx-2" label="user" variant="secondary" />
                                </View>
                            </View>

                            <Avatar className="h-24 w-24">
                                <AvatarImage
                                    className="h-full w-full rounded-full"
                                    source={{
                                        uri: "https://github.com/shadcn.png",
                                    }}
                                />
                                <AvatarFallback>CG</AvatarFallback>
                            </Avatar>
                        </View>
                        <View className="p-4">
                            <Text></Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Profile;