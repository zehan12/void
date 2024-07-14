import { TouchableOpacity, View, Text } from "react-native"

const BottomNav = () => {
    return (
        <View className="absolute bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 mb-4">
            <View className="flex-row h-full justify-around items-center">
                <TouchableOpacity className="flex flex-col items-center justify-center">
                    <View className="w-5 h-5 mb-2 bg-gray-500 dark:bg-gray-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-500" />
                    <Text className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Home</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-col items-center justify-center">
                    <View className="w-5 h-5 mb-2 bg-gray-500 dark:bg-gray-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-500" />
                    <Text className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-col items-center justify-center">
                    <View className="w-5 h-5 mb-2 bg-gray-500 dark:bg-gray-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-500" />
                    <Text className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-col items-center justify-center">
                    <View className="w-5 h-5 mb-2 bg-gray-500 dark:bg-gray-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-500" />
                    <Text className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BottomNav;