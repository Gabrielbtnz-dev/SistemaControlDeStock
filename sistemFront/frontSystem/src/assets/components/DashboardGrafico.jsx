"use client";

import React, { useEffect, useState } from "react";
import { TokenService } from "../../auth/TokenService";
import axios from "axios";
import {
  Line,
  XAxis,
  Legend,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Button, Card, Typography } from "@material-tailwind/react";

function renderLegendText(value) {
  return (
    <span className="text-sm text-gray-600 capitalize ml-1 select-none font-medium">
      Año {value}
    </span>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg p-3 shadow-lg border border-gray-100 flex flex-col gap-1">
        <p className="text-gray-900 font-semibold border-b border-gray-50 pb-1 mb-1">
          {label}
        </p>

        {payload.map((item, index) => (
          <p
            key={index}
            className="text-xs font-medium"
            style={{ color: item.stroke }}
          >
            {`Año ${item.name}: ${Number(item.value).toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
}

export default function DashboardGrafico() {
  const [chartData, setChartData] = useState([]);

  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  const cargarGrafico = async () => {
    const token = TokenService.getToken();
    try {
      const response = await fetch("http://localhost:8085/ventasporagno",{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
      }
  });
      const data = await response.json();

      const formatted = data.map((item) => ({
        month: item.month,
        [currentYear]: item.year_actual,
        [previousYear]: item.year_anterior,
      }));

      setChartData(formatted);
    } catch (error) {
      console.error("Error al cargar gráfico:", error);
    }
  };

  useEffect(() => {
    cargarGrafico();
  }, []);

  return (
    <Card className="border border-gray-100 shadow-sm rounded-xl bg-white">
      <div className="p-6">
        {/* Título de monto acumulado */}
        <Typography className="absolute z-10 text-xl font-bold text-gray-900">
          Total este año
        </Typography>

        <div className="w-full h-[350px] mt-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#f3f4f6"
              />

              <Tooltip content={<CustomTooltip />} />

              <Legend
                height={40}
                iconSize={10}
                align="right"
                iconType="circle"
                verticalAlign="top"
                formatter={renderLegendText}
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="#9ca3af"
                style={{ fontSize: "12px", fontWeight: 500 }}
              />

              <Line
                dot={false}
                type="natural"
                strokeWidth={3}
                dataKey={`${currentYear}`}
                stroke="#2563eb"
                activeDot={{ r: 6 }}
                name={currentYear}
              />

              <Line
                dot={false}
                type="natural"
                strokeWidth={3}
                dataKey={`${previousYear}`}
                stroke="#94a3b8"
                activeDot={{ r: 6 }}
                name={previousYear}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer del Gráfico */}
      <div className="m-0 p-6 w-full flex items-center sm:flex-row flex-col gap-4 justify-between border-t border-gray-50 bg-gray-50/50">
        <div>
          <Typography className="text-base font-bold text-gray-900 mb-0.5">
            Rendimiento Anual de Ventas
          </Typography>

          <Typography className="text-sm text-gray-500 font-normal">
            Comparativa transaccional año contra año
          </Typography>
        </div>

        <Button
          variant="outlined"
          color="blue"
          className="w-full sm:w-auto text-xs py-2.5 px-4 border-gray-200 text-blue-600 hover:bg-blue-50"
        >
          Ver Reporte
        </Button>
      </div>
    </Card>
  );
}