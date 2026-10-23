import Image from "next/image";
import type { Product } from "@/lib/types";

export function ProductArt({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  if (product.image)
    return (
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 30vw"
        style={{ objectFit: "contain" }}
        unoptimized
        preload={priority}
      />
    );
  return (
    <svg
      className="product-art"
      viewBox="0 0 400 330"
      role="img"
      aria-label={`${product.name} concept illustration`}
    >
      <ellipse
        cx="205"
        cy="270"
        rx="116"
        ry="15"
        fill="#28271f"
        opacity=".07"
      />
      {product.art === "bowl" && (
        <g>
          <path d="M88 146h224l-18 93c-9 40-180 40-188 0Z" fill="#82957a" />
          <path d="M88 146h224l-7 38c-68 24-143 24-210-1Z" fill="#9cad91" />
          <ellipse cx="200" cy="146" rx="112" ry="44" fill="#bdc9af" />
          <ellipse cx="200" cy="146" rx="94" ry="31" fill="#65785c" />
          <path
            d="M112 145c23-26 142-26 176 0-29-8-143-8-176 0Z"
            fill="#51674b"
          />
          <path
            d="m129 205 5 30"
            stroke="#d5ddc5"
            opacity=".55"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text
            x="200"
            y="239"
            textAnchor="middle"
            fill="#e9eddf"
            fontSize="13"
            fontFamily="Georgia"
          >
            pawmade
          </text>
        </g>
      )}
      {product.art === "harness" && (
        <g transform="rotate(-14 200 175)">
          <path
            d="M143 86q57-36 114 0l-9 94-19 71h-58l-22-71Z"
            fill="none"
            stroke="#9c4834"
            strokeWidth="28"
            strokeLinejoin="round"
          />
          <path
            d="m151 110 99 105m0-105-88 106"
            stroke="#d67a55"
            strokeWidth="23"
          />
          <path
            d="M125 174q74 36 150 0"
            fill="none"
            stroke="#d67a55"
            strokeWidth="27"
          />
          <path
            d="M125 174q74 36 150 0"
            fill="none"
            stroke="#f6bea0"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <rect x="186" y="177" width="32" height="31" rx="5" fill="#343b30" />
          <rect x="193" y="185" width="18" height="14" rx="2" fill="#d67a55" />
          <ellipse
            cx="199"
            cy="83"
            rx="14"
            ry="17"
            fill="none"
            stroke="#c7c5b5"
            strokeWidth="7"
          />
        </g>
      )}
      {product.art === "bed" && (
        <g>
          <ellipse cx="200" cy="211" rx="137" ry="65" fill="#bcaa92" />
          <path
            d="M64 202c0-96 272-96 272 0v18c0 80-272 80-272 0Z"
            fill="#d4c5ae"
          />
          <ellipse cx="200" cy="191" rx="136" ry="70" fill="#e0d5c4" />
          <ellipse cx="200" cy="193" rx="99" ry="44" fill="#bcae96" />
          <ellipse cx="200" cy="200" rx="91" ry="38" fill="#ccbea6" />
          <path
            d="M88 195c0-60 224-60 224 0M84 213c24 61 207 63 231-3"
            fill="none"
            stroke="#eee5d7"
            strokeWidth="3"
            strokeDasharray="2 7"
          />
          <rect x="249" y="244" width="34" height="17" rx="2" fill="#75806b" />
          <text x="266" y="255" textAnchor="middle" fill="white" fontSize="7">
            pawmade
          </text>
        </g>
      )}
      {product.art === "rope" && (
        <g transform="rotate(-30 200 175)">
          <path
            d="M110 175q25-84 65-15l50 36q56 48 70-22-4-70-62-15l-54 36q-56 53-69-20Z"
            fill="none"
            stroke="#b39d64"
            strokeWidth="27"
          />
          <path
            d="M110 175q25-84 65-15l50 36q56 48 70-22-4-70-62-15l-54 36q-56 53-69-20Z"
            fill="none"
            stroke="#e6d6a9"
            strokeWidth="21"
            strokeDasharray="3 7"
          />
          <path
            d="m177 153 45 51m-38-57 45 51"
            stroke="#74806a"
            strokeWidth="13"
          />
          <path
            d="m181 150 44 51"
            stroke="#9faa8b"
            strokeWidth="3"
            strokeDasharray="3 5"
          />
        </g>
      )}
      {product.art === "toy" && (
        <g transform="rotate(-15 200 180)">
          <path d="m115 180-40-52v102Z" fill="#6c8695" />
          <ellipse cx="216" cy="178" rx="103" ry="58" fill="#8ba2ae" />
          <path
            d="M151 145q33 30 0 66m37-85q35 53 0 104m39-99q31 47 0 96"
            fill="none"
            stroke="#c4d2d6"
            strokeWidth="4"
            strokeDasharray="3 4"
          />
          <circle cx="284" cy="165" r="5" fill="#303c43" />
          <path d="m205 125 32-28 20 38" fill="#6c8695" />
        </g>
      )}
      {product.art === "carrier" && (
        <g>
          <path d="M100 127h200l-13 126q-87 28-174 0Z" fill="#d2c4a0" />
          <path
            d="M100 127q96 39 200 0"
            fill="none"
            stroke="#eee2c4"
            strokeWidth="12"
          />
          <path
            d="M148 254V121c0-87 104-87 104 0v133"
            fill="none"
            stroke="#737a54"
            strokeWidth="19"
          />
          <path
            d="M148 254V121c0-87 104-87 104 0v133"
            fill="none"
            stroke="#a6ac84"
            strokeWidth="2"
          />
          <rect x="169" y="173" width="65" height="54" rx="5" fill="#e8dcbf" />
          <text
            x="201"
            y="204"
            textAnchor="middle"
            fill="#727852"
            fontSize="11"
            fontFamily="Georgia"
          >
            pawmade
          </text>
        </g>
      )}
      {!product.art && (
        <g fill="none" stroke="#9b9b87" strokeWidth="4">
          <rect x="130" y="100" width="140" height="140" rx="18" />
          <path d="m130 140 70 40 70-40m-70 40v60" />
          <text
            x="200"
            y="280"
            textAnchor="middle"
            stroke="none"
            fill="#6c6c60"
            fontSize="13"
          >
            Product photo coming soon
          </text>
        </g>
      )}
    </svg>
  );
}
