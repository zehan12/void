import { useColorScheme } from "nativewind";
import { Button } from "../ui/Button";

export function ModeToggle() {
    const { colorScheme, setColorScheme } = useColorScheme();

    return (
        <Button
            className="bg-foreground"
            label="Toggle"
            variant={"ghost"}
            onPress={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}
        />
    )
}
