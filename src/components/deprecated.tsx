import React, { useRef, useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5Map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_usaLow from '@amcharts/amcharts5-geodata/usaLow';

type Props = {
  inputData: any[];
};

const HospitalChart: React.FC<Props> = ({ inputData }) => {
  const chartRef = useRef<any | null>(null);
  const pointSeriesRef = useRef<any | null>(null);

  // Creates the chart, this code only runs one time
  useLayoutEffect(() => {
    const root = am5.Root.new('chartdiv');

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5Map.MapChart.new(root, {
        panX: 'translateX',
        panY: 'translateY',
        projection: am5Map.geoAlbersUsa(),
      }),
    );

    chart.set('zoomControl', am5Map.ZoomControl.new(root, {}));

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    const polygonSeries = chart.series.push(
      am5Map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_usaLow,
        // exclude: ['AQ'],
      }),
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0xdadada),
    });

    // Create point series for markers
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
    const pointSeries = chart.series.push(
      am5Map.ClusteredPointSeries.new(root, {
        minDistance: 20,
        groupIdField: 'state',
      }),
    );

    // Set clustered bullet
    // https://www.amcharts.com/docs/v5/charts/map-chart/clustered-point-series/#Group_bullet
    pointSeries.set('clusteredBullet', function (root) {
      const container = am5.Container.new(root, {
        cursorOverStyle: 'pointer',
      });

      const circle1 = container.children.push(
        am5.Circle.new(root, {
          radius: 8,
          tooltipY: 0,
          fill: am5.color(0xff8c00),
        }),
      );

      const circle2 = container.children.push(
        am5.Circle.new(root, {
          radius: 12,
          fillOpacity: 0.3,
          tooltipY: 0,
          fill: am5.color(0xff8c00),
        }),
      );

      // const circle3 = container.children.push(
      //   am5.Circle.new(root, {
      //     radius: 16,
      //     fillOpacity: 0.3,
      //     tooltipY: 0,
      //     fill: am5.color(0xff8c00),
      //   }),
      // );

      // const circle4 = container.children.push(
      //   am5.Circle.new(root, {
      //     radius: 20,
      //     fillOpacity: 0.3,
      //     tooltipY: 0,
      //     fill: am5.color(0xff8c00),
      //   }),
      // );

      const label = container.children.push(
        am5.Label.new(root, {
          centerX: am5.p50,
          centerY: am5.p50,
          fill: am5.color(0xffffff),
          populateText: true,
          fontSize: '8',
          text: '{value}',
        }),
      );

      container.events.on('click', function (e: any) {
        pointSeries.zoomToCluster(e.target.dataItem);
      });

      return am5.Bullet.new(root, {
        sprite: container,
      });
    });

    // Create regular bullets
    pointSeries.bullets.push(function () {
      const circle = am5.Circle.new(root, {
        radius: 6,
        tooltipY: 0,
        fill: am5.color(0xff8c00),
        tooltipText: '{title}',
      });

      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });

    chartRef.current = chart;
    pointSeriesRef.current = pointSeries;
    return () => {
      root.dispose();
    };
  }, []);

  // When the paddingRight prop changes it will update the chart
  useLayoutEffect(() => {
    const mapData = inputData.map((hospital) => ({
      geometry: { type: 'Point', coordinates: [Number(hospital.lon), Number(hospital.lat)] },
      title: hospital.name,
      city: hospital.city,
      state: hospital.state,
    }));
    pointSeriesRef.current.data.setAll(mapData);
  }, [inputData]);

  return <div id="chartdiv" style={{ width: '1000px', height: '800px' }}></div>;
};
export default HospitalChart;
