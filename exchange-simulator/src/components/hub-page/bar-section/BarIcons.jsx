function BarIcons(props) {
  if (props.name === "plus") {
    return (
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <title>plus-circle</title>
        <desc>Created with Sketch Beta.</desc>
        <defs></defs>
        <g stroke="none" fill="none">
          <g transform="translate(-464.000000, -1087.000000)" fill="#f8f9fa">
            <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z"></path>
          </g>
        </g>
      </svg>
    );
  } else if (props.name === "friend") {
    return (
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <g />

        <g>
          <g fill="#f8f9fa">
            <path d="M132.56,54.6c-19.51,18.23-30.25,43.18-30.25,70.28c0,26.7,10.17,54.87,27.92,77.28    c19.77,24.98,45.62,38.74,72.79,38.74s53.02-13.76,72.79-38.74c17.74-22.42,27.92-50.59,27.92-77.28    c0-27.1-10.74-52.05-30.25-70.28c-18.71-17.48-43.73-27.1-70.45-27.1S151.26,37.13,132.56,54.6z M271.71,124.88    c0,38.06-30.65,84.02-68.7,84.02s-68.7-45.96-68.7-84.02c0-18.13,7.14-34.79,20.1-46.9c12.76-11.92,30.02-18.49,48.6-18.49    s35.84,6.57,48.6,18.49C264.57,90.09,271.71,106.75,271.71,124.88z" />

            <path d="M373.27,284.57c-11.18,0-22.01,1.8-32.36,5.36c-3.3-3.78-6.89-7.42-10.76-10.88    c-8.47-7.59-18.2-14.29-28.91-19.92c-5.28-2.78-10.93-5.36-16.81-7.67c-4.64-1.82-9.86-1.38-14.12,1.2    c-20.83,12.58-44.1,19.23-67.31,19.23s-46.48-6.65-67.31-19.23c-4.26-2.57-9.48-3.02-14.11-1.2c-5.85,2.29-11.5,4.87-16.8,7.66    c-24.5,12.87-43.83,31.52-54.44,52.51c-10.38,20.53-13.72,45.13-10.19,75.21c3.86,32.96,8.97,61.02,15.61,85.79    c1.88,6.99,8.21,11.86,15.45,11.86H334.8c3.98,0,7.68-1.47,10.52-3.96c9.02,2.63,18.37,3.96,27.95,3.96    c55.12,0,99.96-44.84,99.96-99.96C473.23,329.42,428.39,284.57,373.27,284.57z M83.68,452.5c-4.81-20.35-8.68-43.18-11.75-69.37    c-2.81-23.98-0.59-42.1,6.97-57.06c7.63-15.11,22.11-28.82,40.77-38.63c2.16-1.14,4.39-2.23,6.68-3.27    c23.95,12.92,50.28,19.72,76.64,19.72c26.36,0,52.69-6.79,76.64-19.71c2.3,1.05,4.54,2.14,6.7,3.28    c8.39,4.41,15.95,9.6,22.48,15.46c1.01,0.9,2,1.82,2.96,2.75c-0.18,0.14-0.36,0.29-0.54,0.43c-0.3,0.24-0.6,0.48-0.9,0.72    c-0.55,0.45-1.1,0.9-1.64,1.35c-0.29,0.24-0.57,0.48-0.86,0.73c-0.59,0.51-1.17,1.02-1.75,1.54c-0.21,0.19-0.43,0.38-0.64,0.58    c-0.78,0.72-1.56,1.45-2.32,2.19c-0.11,0.11-0.23,0.23-0.34,0.34c-0.64,0.63-1.27,1.27-1.89,1.92c-0.24,0.25-0.47,0.5-0.71,0.75    c-0.5,0.53-0.99,1.06-1.47,1.6c-0.25,0.28-0.5,0.55-0.74,0.83c-0.48,0.54-0.95,1.09-1.41,1.64c-0.22,0.26-0.44,0.53-0.66,0.79    c-0.55,0.67-1.09,1.35-1.63,2.04c-0.11,0.15-0.23,0.29-0.34,0.44c-0.65,0.84-1.28,1.69-1.9,2.55c-0.15,0.2-0.29,0.41-0.43,0.62    c-0.47,0.66-0.92,1.32-1.37,1.98c-0.2,0.29-0.39,0.58-0.58,0.88c-0.39,0.6-0.78,1.2-1.17,1.81c-0.19,0.31-0.38,0.61-0.57,0.92    c-0.39,0.64-0.77,1.28-1.15,1.93c-0.16,0.27-0.31,0.53-0.47,0.8c-1.04,1.83-2.03,3.7-2.95,5.6c-0.13,0.27-0.26,0.55-0.39,0.83    c-0.32,0.68-0.64,1.37-0.95,2.06c-0.15,0.33-0.29,0.67-0.44,1c-0.29,0.66-0.56,1.32-0.83,1.98c-0.14,0.33-0.27,0.66-0.4,0.99    c-0.29,0.74-0.57,1.48-0.85,2.22c-0.09,0.25-0.19,0.5-0.28,0.76c-0.36,1-0.71,2.01-1.03,3.02c-0.05,0.16-0.1,0.32-0.15,0.48    c-0.27,0.85-0.53,1.7-0.78,2.56c-0.1,0.33-0.19,0.67-0.28,1c-0.19,0.7-0.38,1.4-0.56,2.1c-0.09,0.37-0.19,0.74-0.27,1.11    c-0.17,0.7-0.33,1.41-0.49,2.11c-0.08,0.35-0.15,0.69-0.23,1.04c-0.18,0.85-0.34,1.71-0.5,2.57c-0.04,0.2-0.08,0.39-0.11,0.59    c-0.18,1.06-0.35,2.12-0.5,3.19c-0.04,0.28-0.07,0.57-0.11,0.85c-0.1,0.79-0.2,1.57-0.29,2.36c-0.04,0.38-0.08,0.76-0.11,1.15    c-0.07,0.71-0.13,1.43-0.19,2.14c-0.03,0.39-0.06,0.79-0.08,1.18c-0.05,0.75-0.09,1.5-0.12,2.26c-0.01,0.34-0.03,0.69-0.04,1.03    c-0.04,1.09-0.06,2.19-0.06,3.29c0,19.18,5.46,37.83,15.77,53.91c0.73,1.14,1.49,2.26,2.27,3.37c0.23,0.33,0.48,0.66,0.71,0.99    c0.56,0.79,1.14,1.56,1.73,2.33c0.27,0.35,0.54,0.7,0.81,1.05c0.64,0.82,1.3,1.62,1.96,2.42c0.2,0.24,0.4,0.49,0.61,0.73    c0.87,1.02,1.76,2.03,2.67,3.01c0.04,0.05,0.08,0.1,0.13,0.14H83.68z M373.27,452.5c-10.31,0-20.21-2.25-29.42-6.68    c-23.42-11.26-38.55-35.32-38.55-61.28c0-1.62,0.06-3.23,0.17-4.83c1.67-23.97,15.7-45.14,37.47-56.01    c9.45-4.73,19.66-7.13,30.33-7.13c37.47,0,67.96,30.49,67.96,67.97C441.23,422.01,410.74,452.5,373.27,452.5z" />

            <path d="M399.2,368.54h-9.93v-9.93c0-8.84-7.16-16-16-16s-16,7.16-16,16v9.93h-9.93c-8.84,0-16,7.16-16,16    s7.16,16,16,16h9.93v9.93c0,8.84,7.16,16,16,16s16-7.16,16-16v-9.93h9.93c8.84,0,16-7.16,16-16S408.03,368.54,399.2,368.54z" />
          </g>
        </g>
      </svg>
    );
  } else if (props.name === "account") {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="#f8f9fa"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M110.4 923.2c-56.8 0-102.4-48-102.4-106.4V285.6c0-58.4 45.6-106.4 102.4-106.4h800.8c56.8 0 102.4 48 102.4 106.4V816c0 58.4-45.6 106.4-102.4 106.4H110.4z m0-701.6c-34.4 0-61.6 28.8-61.6 64V816c0 35.2 28 64 61.6 64h800.8c34.4 0 61.6-28.8 61.6-64V285.6c0-35.2-28-64-61.6-64H110.4z"
          fill=""
        />
        <path
          d="M541.6 392c-12.8 0-23.2-10.4-23.2-24s10.4-24 23.2-24h328c12.8 0 23.2 10.4 23.2 24s-10.4 24-23.2 24h-328zM541.6 511.2c-12.8 0-23.2-10.4-23.2-24s10.4-24 23.2-24h328c12.8 0 23.2 10.4 23.2 24s-10.4 24-23.2 24h-328zM541.6 638.4c-12.8 0-23.2-10.4-23.2-24s10.4-24 23.2-24h276.8c12.8 0 23.2 10.4 23.2 24s-10.4 24-23.2 24H541.6zM58.4 886.4c-2.4 0-4.8 0-7.2-0.8-12.8-4-20-18.4-16-32 23.2-78.4 77.6-142.4 148-176l16-8-13.6-12c-40-34.4-63.2-85.6-63.2-139.2 0-100 78.4-180.8 173.6-180.8 96 0 173.6 80.8 173.6 180.8 0 53.6-23.2 104.8-63.2 139.2l-13.6 12 16 8c68 32 132.8 112 157.6 194.4 16 52.8-16.8 36-1.6 16-3.2 4.8-16.8-5.6-32-5.6-12.8 0-19.2 24.8-19.2 22.4-31.2-104-120.8-203.2-217.6-203.2-99.2 0-186.4 67.2-216 166.4-1.6 11.2-11.2 18.4-21.6 18.4z m239.2-498.4c-69.6 0-126.4 58.4-126.4 130.4s56.8 130.4 126.4 130.4c69.6 0 126.4-58.4 126.4-130.4-0.8-72-56.8-130.4-126.4-130.4z"
          fill=""
        />
      </svg>
    );
  } else if (props.name === "ranking") {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.67 14H4C2.9 14 2 14.9 2 16V22H8.67V14Z" stroke="#f8f9fa" />
        <path
          d="M13.33 10H10.66C9.56003 10 8.66003 10.9 8.66003 12V22H15.33V12C15.33 10.9 14.44 10 13.33 10Z"
          stroke="#f8f9fa"
        />
        <path
          d="M20 17H15.33V22H22V19C22 17.9 21.1 17 20 17Z"
          stroke="#f8f9fa"
        />
        <path
          d="M12.52 2.07007L13.05 3.13006C13.12 3.28006 13.31 3.42006 13.47 3.44006L14.43 3.60007C15.04 3.70007 15.19 4.15005 14.75 4.58005L14 5.33005C13.87 5.46005 13.8 5.70006 13.84 5.87006L14.05 6.79007C14.22 7.52007 13.83 7.80007 13.19 7.42007L12.29 6.89007C12.13 6.79007 11.86 6.79007 11.7 6.89007L10.8 7.42007C10.16 7.80007 9.76998 7.52007 9.93998 6.79007L10.15 5.87006C10.19 5.70006 10.12 5.45005 9.98999 5.33005L9.24999 4.59006C8.80999 4.15006 8.94999 3.71005 9.56999 3.61005L10.53 3.45007C10.69 3.42007 10.88 3.28007 10.95 3.14007L11.48 2.08005C11.77 1.50005 12.23 1.50007 12.52 2.07007Z"
          stroke="#f8f9fa"
        />
      </svg>
    );
  }
}

export default BarIcons;
