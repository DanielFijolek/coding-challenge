import { FC, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text, IconButton, Chip } from "react-native-paper";
import { prepareDateText, dayDiff } from "./utils/dateHelpers";

type ProductItemProps = {
  image?: string;
  name: string;
  categories: string;
  date: string;
};

const ProductItem: FC<ProductItemProps> = (props) => {
  const [showCategories, setShowCategories] = useState(true);

  const { image, name, categories, date } = props;
  const categoriesArray = categories?.split(",");
  const newDate = new Date(date);

  const isNew = dayDiff(newDate) < 7;

  const handleShowCategoriesChange = () => {
    setShowCategories((state) => !state);
  };

  return (
    <View style={styles.productItemRoot}>
      <View style={styles.imageView}>
        <Image
          source={
            image
              ? { uri: image, width: 85, height: 110 }
              : require("../assets/image-placeholder.png")
          }
          style={styles.image}
        />
      </View>
      <View style={styles.informationsView}>
        <View style={styles.headerView}>
          <Text variant="titleMedium" style={styles.title} numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.headerIconsView}>
            {isNew ? (
              <View style={styles.newIcon}>
                <Text style={styles.newIconText}>NEW</Text>
              </View>
            ) : null}
            <IconButton
              icon="apple-keyboard-control"
              iconColor={"#5E646E"}
              size={16}
              style={
                (styles.arrowIcon,
                showCategories ? styles.rotate360 : styles.rotate180)
              }
              onPress={handleShowCategoriesChange}
            />
          </View>
        </View>
        <Text style={{ fontSize: 12 }}>{prepareDateText(newDate)}</Text>
        {showCategories ? (
          <View style={styles.categoriesView}>
            {categoriesArray?.map((name) => (
              <Chip textStyle={{ fontSize: 11 }} style={styles.chip}>
                {name}
              </Chip>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productItemRoot: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "rgba(27, 38, 51, 0.25)",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 4
  },
  imageView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  image: { resizeMode: "contain", alignSelf: "center" },
  informationsView: {
    flex: 2,
    gap: 4,
    justifyContent: "flex-start"
  },
  headerView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    maxHeight: 25
  },
  title: {
    flex: 0.55,
    color: "#1B2633",
    fontWeight: "900",
    overflow: "hidden",
    height: 25,
    paddingRight: 8
  },
  headerIconsView: {
    flex: 0.45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    maxHeight: 25
  },
  newIcon: {
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 4,
    height: 25,
    borderRadius: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  newIconText: { color: "white", fontSize: 12 },
  arrowIcon: {
    margin: 0,
    padding: 0,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "rgba(27, 38, 51)"
  },
  rotate180: { transform: [{ rotate: "180deg" }] },
  rotate360: { transform: [{ rotate: "360deg" }] },
  categoriesView: { flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 2 },
  chip: { backgroundColor: "#D4E5FF", padding: 0 }
});

export default ProductItem;
