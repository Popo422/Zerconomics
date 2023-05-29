import mongoose from "mongoose";

const ProductStatsSchema = new mongoose.Schema(
  {
    productId: String,
    yearlySaleTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

const ProductStats = mongoose.model("ProductStats", ProductStatsSchema);
export default ProductStats;
