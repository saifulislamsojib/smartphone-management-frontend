import { Sell } from "@/types/sell.type";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    flexDirection: "row",
    fontSize: 13,
    margin: "0 10px",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    padding: 5,
    color: "green",
  },
  subtitle: {
    fontSize: 13,
    padding: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  tableHead: {
    border: "1px solid black",
    width: 150,
    padding: 10,
    textAlign: "center",
  },
  tableData: {
    border: "1px solid black",
    width: 150,
    padding: 10,
    textAlign: "center",
  },
});

type Props = {
  sellInfo: Sell;
  smartphoneName: string;
};

const InvoicePdfDoc = ({ sellInfo, smartphoneName }: Props) => {
  const { buyerName, saleDate, quantity, totalPrice, _id } = sellInfo || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Sell Invoice</Text>
          <Text style={styles.subtitle}>Sell ID: #{_id}</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.tableHead, { width: 200 }]}>
            Smartphone Name
          </Text>
          <Text style={styles.tableHead}>Buyer Name</Text>
          <Text style={[styles.tableHead, { width: 120 }]}>Quantity</Text>
          <Text style={styles.tableHead}>Date</Text>
          <Text style={styles.tableHead}>Total Price</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.tableData, { width: 200 }]}>
            {smartphoneName}
          </Text>
          <Text style={styles.tableData}>{buyerName}</Text>
          <Text style={[styles.tableData, { width: 120 }]}>{quantity}</Text>
          <Text style={styles.tableData}>
            {new Date(saleDate).toISOString().split("T")[0]}
          </Text>
          <Text style={styles.tableHead}>{totalPrice}</Text>
        </View>
        <View>
          <Text style={[styles.title, { marginTop: 10, fontStyle: "italic" }]}>
            Full Paid
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePdfDoc;
