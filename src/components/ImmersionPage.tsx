import Image from "next/image";
import styles from "./ImmersionPage.module.css";

const PLUS_PATH =
  "M7.5 15V8.5H1C0.723858 8.5 0.5 8.27614 0.5 8C0.5 7.72386 0.723858 7.5 1 7.5H7.5V1C7.5 0.723858 7.72386 0.5 8 0.5C8.27614 0.5 8.5 0.723858 8.5 1V7.5H15C15.2761 7.5 15.5 7.72386 15.5 8C15.5 8.27614 15.2761 8.5 15 8.5H8.5V15C8.5 15.2761 8.27614 15.5 8 15.5C7.72386 15.5 7.5 15.2761 7.5 15Z";

const clientRows: { brands: string[]; sep: string }[] = [
  {
    brands: ["Стоечно-ригельные системы", "Структурное остекление", "Планарное остекление"],
    sep: "■",
  },
  {
    brands: ["Вентилируемые фасады", "Навесные фасадные системы", "Штукатурные фасады"],
    sep: "□",
  },
  {
    brands: ["Мягкая кровля", "Жёсткая кровля", "Зенитные фонари"],
    sep: "■",
  },
  {
    brands: ["Пожаростойкие конструкции", "Системы автоматики", "Архитектурное освещение"],
    sep: "□",
  },
  {
    brands: ["Алюминиевые окна", "Входные группы", "Раздвижные системы", "Балконное остекление"],
    sep: "■",
  },
];

function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/immersion/ce9722a6c7a28afb0f17d38e2a01b9706daba786-3840x1878.jpg"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        alt=""
      />

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Виды деятельности</h1>

        <svg
          viewBox="0 0 16 16"
          fill="white"
          className={styles.heroIcon}
          aria-hidden="true"
        >
          <path d={PLUS_PATH} />
        </svg>

        <p className={styles.heroSubtitle}>
          Фасадные и реставрационные работы полного цикла — от проектирования
          и изготовления конструкций до монтажа и сдачи объекта.
        </p>
      </div>
    </section>
  );
}

function LargeText() {
  return (
    <section className={styles.largeText}>
      <p className={styles.largeTextBody}>
        Фасадное остекление — основное направление работы СК&nbsp;КОМКОР.
        Алюминиевые светопрозрачные конструкции любой сложности,
        от жилых комплексов до общественных зданий.
      </p>
    </section>
  );
}

function LivingSpace() {
  return (
    <section>
      <div className={styles.livingBeige}>
        <div className={styles.livingIntro}>
          <p className={styles.livingIntroText}>
            Стоечно-ригельная система — несущий алюминиевый каркас из вертикальных
            стоек и горизонтальных ригелей. Обеспечивает лёгкость монтажа,
            долговечность, тепло- и огнестойкость.
          </p>
        </div>

        <div className={styles.livingHeroImage}>
          <Image
            src="/images/immersion/82554d7095c8c334a2c37b94c97aa8c99820e8a4-3840x2160.jpg"
            fill
            sizes="100vw"
            className="object-cover"
            alt="Archidomo showroom exterior"
          />
        </div>
      </div>

      <div className={styles.livingWhite}>
        <div className={styles.livingMain}>
          <div className={styles.livingMainText}>
            Система с&nbsp;прижимной планкой монтируется в&nbsp;проёмы или несущие конструкции.
            Стекло фиксируется на&nbsp;прокладках и&nbsp;закрепляется штапиком.
            Минимальная толщина профиля&nbsp;— 40&nbsp;мм.
          </div>

          <div className={styles.livingSmallImage}>
            <Image
              src="/images/immersion/62648c825c6f5331bd7030c88acc351c083df758-906x604.jpg"
              fill
              sizes="357px"
              className="object-cover"
              alt="Interior living space"
            />
          </div>
        </div>

        <div className={styles.livingBottom}>
          <p className={styles.livingBottomText}>
            Структурное остекление — тёплый фасад без внешних алюминиевых профилей.
            Специальный клей-герметик выступает основным несущим элементом,
            обеспечивая защиту от влаги, холода и шума.
          </p>

          <div className={styles.gallery}>
            <div className={styles.galleryPortrait}>
              <Image
                src="/images/immersion/cba7cea352aceefd8a7a831b2272c8b96522c1fe-918x1376.jpg"
                fill
                sizes="361px"
                className="object-cover"
                alt="Staircase interior"
              />
            </div>

            <div className={styles.galleryRight}>
              <div className={styles.gallerySquare}>
                <Image
                  src="/images/immersion/b6d6a951e5c75b287f0e160a0e268203be7d1623-910x910.jpg"
                  fill
                  sizes="50vw"
                  className="object-cover"
                  alt="Interior space"
                />
              </div>
              <div className={styles.galleryLandscape}>
                <Image
                  src="/images/immersion/254fad0b4cfb98fd503face54b3bec75a9819b4f-2494x1400.jpg"
                  fill
                  sizes="50vw"
                  className="object-cover"
                  alt="Terrace with mountain view"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section className={styles.clients}>
      <p className={styles.clientsIntro}>
        Полный перечень видов работ, которые СК&nbsp;КОМКОР выполняет самостоятельно —
        без привлечения субподрядчиков на ключевых этапах.
      </p>

      <div className={styles.brandRows}>
        {clientRows.map((row, rowIdx) => (
          <div key={rowIdx} className={styles.brandRow}>
            {row.brands.map((brand, i) => (
              <div key={brand} className={styles.brandItem}>
                <span className={styles.brandName}>{brand}</span>
                {i < row.brands.length - 1 && (
                  <span className={styles.brandSep}>{row.sep}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ImmersionPage() {
  return (
    <>
      <Hero />
      <LargeText />
      <LivingSpace />
      <Clients />
    </>
  );
}
