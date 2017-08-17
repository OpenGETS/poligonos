CREATE TABLE `carga_infoemx_sal_dir` (
  `rut_cliente` VARCHAR(12) COLLATE utf8_general_ci NOT NULL,
  `id_direccion` INTEGER(10) NOT NULL,
  `tipo` VARCHAR(5) COLLATE utf8_general_ci DEFAULT NULL,
  `calle` VARCHAR(80) COLLATE utf8_general_ci DEFAULT NULL,
  `numero` VARCHAR(10) COLLATE utf8_general_ci DEFAULT NULL,
  `codigo_comuna` VARCHAR(3) COLLATE utf8_general_ci DEFAULT NULL,
  `vblock` VARCHAR(4) COLLATE utf8_general_ci DEFAULT NULL,
  `piso` VARCHAR(2) COLLATE utf8_general_ci DEFAULT NULL,
  `depto` VARCHAR(4) COLLATE utf8_general_ci DEFAULT NULL,
  `poblacion_villa` VARCHAR(30) COLLATE utf8_general_ci DEFAULT NULL,
  `codigo_ciudad` VARCHAR(6) COLLATE utf8_general_ci DEFAULT NULL,
  `estado_direccion` VARCHAR(5) COLLATE utf8_general_ci DEFAULT NULL,
  `observaciones` VARCHAR(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `direccion_asignacion` VARCHAR(1) COLLATE utf8_general_ci DEFAULT NULL,
  `sector` VARCHAR(15) COLLATE utf8_general_ci DEFAULT NULL,
  `datos_complementarios` VARCHAR(100) COLLATE latin1_spanish_ci DEFAULT NULL,
  `latitud` VARCHAR(20) COLLATE utf8_general_ci DEFAULT NULL,
  `longitud` VARCHAR(20) COLLATE utf8_general_ci DEFAULT NULL,
  `tipo_marca_direccion` VARCHAR(100) COLLATE utf8_general_ci DEFAULT NULL,
  `datos_complementarios_2` VARCHAR(100) COLLATE utf8_general_ci DEFAULT NULL,
  `es99` TINYINT(4) DEFAULT 0,
  `llave` VARCHAR(100) COLLATE utf8_general_ci NOT NULL,
  `fecha_creacion` DATETIME DEFAULT NULL,
  `fecha_modificacion` DATETIME DEFAULT NULL,
  `estado_inicial` VARCHAR(5) COLLATE utf8_general_ci DEFAULT NULL,
  `estado_inicial_default` VARCHAR(1) COLLATE utf8_general_ci DEFAULT NULL,
  `codigo_ejecutivo` VARCHAR(45) COLLATE utf8_general_ci DEFAULT NULL,
  `latitud_preliminar` FLOAT(10,8) DEFAULT NULL,
  `longitud_preliminar` FLOAT(10,8) DEFAULT NULL,
  `llave_emerix` VARCHAR(45) COLLATE utf8_general_ci DEFAULT NULL,
  `direccion_formateada` VARCHAR(500) COLLATE utf8_general_ci DEFAULT NULL,
  `isapp` VARBINARY(1) DEFAULT '0',
  `calle_normalizado` VARCHAR(80) COLLATE utf8_general_ci DEFAULT NULL,
  `numero_normalizado` VARCHAR(10) COLLATE utf8_general_ci DEFAULT NULL,
  `lat_normalizado` VARCHAR(20) COLLATE utf8_general_ci DEFAULT NULL,
  `lon_normalizado` VARCHAR(20) COLLATE utf8_general_ci DEFAULT NULL,
  `comuna_normalizado` VARCHAR(50) COLLATE utf8_general_ci DEFAULT NULL,
  `cod_norm_xygo` INTEGER(11) DEFAULT NULL,
  `sector_normalizado` VARCHAR(15) COLLATE utf8_general_ci DEFAULT NULL,
  `cod_norm_og` INTEGER(11) DEFAULT NULL,
  `fk_rut_id` INTEGER(11) DEFAULT NULL,
  `punto` GEOMETRY DEFAULT NULL,
  UNIQUE KEY `llave` USING BTREE (`llave`),
  KEY `carga_infoemx_sal_dir_idx1` USING BTREE (`rut_cliente`),
  KEY `carga_infoemx_sal_dir_idx3` USING BTREE (`sector`),
  KEY `carga_infoemx_sal_dir_idx2` USING BTREE (`id_direccion`),
  KEY `carga_infoemx_sal_dir_idx4` USING BTREE (`direccion_asignacion`),
  KEY `carga_infoemx_sal_dir_idx5` USING BTREE (`fk_rut_id`)
) ENGINE=MyISAM
CHARACTER SET 'utf8' COLLATE 'utf8_general_ci'
;

CREATE TABLE `carga_infoemx_sal_fih` (
  `rut_cliente` VARCHAR(12) COLLATE utf8_general_ci NOT NULL,
  `nombre_cliente` VARCHAR(80) COLLATE utf8_general_ci DEFAULT NULL,
  `codigo_ejecutivo` VARCHAR(20) COLLATE utf8_general_ci DEFAULT NULL,
  `secuencia` INTEGER(14) DEFAULT NULL,
  `fecha_asignacion` VARCHAR(10) COLLATE utf8_general_ci DEFAULT NULL,
  `fecha_vencimiento` VARCHAR(10) COLLATE utf8_general_ci DEFAULT NULL,
  `impacto` VARCHAR(3) COLLATE utf8_general_ci DEFAULT NULL,
  `codigo_campagna` VARCHAR(5) COLLATE utf8_general_ci DEFAULT NULL,
  `estrategia_origen` VARCHAR(3) COLLATE utf8_general_ci DEFAULT NULL,
  `codigo_estado_judicial` VARCHAR(3) COLLATE utf8_general_ci DEFAULT NULL,
  `oferta` VARCHAR(150) COLLATE utf8_general_ci DEFAULT NULL,
  `resumen` VARCHAR(10) COLLATE utf8_general_ci DEFAULT NULL,
  `monto_expuesto` VARCHAR(8) COLLATE utf8_general_ci DEFAULT NULL,
  `sector` VARCHAR(15) COLLATE utf8_general_ci DEFAULT NULL,
  `ficha` VARCHAR(1) COLLATE utf8_general_ci DEFAULT NULL,
  `segmento` VARCHAR(5) COLLATE utf8_general_ci DEFAULT NULL,
  `hito` VARCHAR(3) COLLATE utf8_general_ci DEFAULT NULL,
  `claveejerut` VARCHAR(30) COLLATE utf8_general_ci DEFAULT NULL,
  `fk_rut_id` INTEGER(11) DEFAULT NULL,
  `fk_ejecutivo_id` INTEGER(11) DEFAULT NULL,
  PRIMARY KEY USING BTREE (`rut_cliente`),
  KEY `carga_infoemx_sal_fih_idx2` USING BTREE (`codigo_ejecutivo`),
  KEY `carga_infoemx_sal_fih_idx3` USING BTREE (`resumen`),
  KEY `carga_infoemx_sal_fih_idx1` USING BTREE (`impacto`),
  KEY `carga_infoemx_sal_fih_idx4` USING BTREE (`claveejerut`),
  KEY `carga_infoemx_sal_fih_idx5` USING BTREE (`fk_rut_id`),
  KEY `carga_infoemx_sal_fih_idx6` USING BTREE (`fk_ejecutivo_id`)
) ENGINE=MyISAM
CHARACTER SET 'utf8' COLLATE 'utf8_general_ci'
;

update carga_infoemx_sal_dir set punto= POINT(longitud, latitud) where latitud is not null;