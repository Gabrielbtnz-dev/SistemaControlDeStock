-- =========================
-- PERSONAS
-- =========================
CREATE TABLE person (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    documento VARCHAR(255),
    funcionario BOOLEAN DEFAULT false,
    cliente BOOLEAN DEFAULT false,
    contribuyente BOOLEAN DEFAULT false,
    digito_verificador VARCHAR(255),
    activo BOOLEAN DEFAULT true
);

-- =========================
-- VENTAS
-- =========================
CREATE TABLE ventas (
    id BIGSERIAL PRIMARY KEY,
    id_person BIGINT NOT NULL,
    valor_total NUMERIC(38,2) DEFAULT 0,
    valor_regularizado NUMERIC(38,2) DEFAULT 0,
    valor_pendiente NUMERIC(38,2) DEFAULT 0,
    observaciones VARCHAR(255),
    status BOOLEAN DEFAULT true,
    CONSTRAINT fk_ventas_person
        FOREIGN KEY (id_person) REFERENCES person(id)
);

-- =========================
-- PRODUCTOS VENDIDOS
-- =========================
CREATE TABLE items_sales (
    id BIGSERIAL PRIMARY KEY,
    id_venta BIGINT NOT NULL,
    precio NUMERIC(38,2) NOT NULL,
    cantidad NUMERIC(38,2) NOT NULL,
    valor NUMERIC(38,2) NOT NULL,
    CONSTRAINT fk_items_sales_ventas
        FOREIGN KEY (id_venta) REFERENCES ventas(id) ON DELETE CASCADE
);

-- =========================
-- CAJAS
-- =========================
CREATE TABLE cuentascajas (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    saldo NUMERIC(38,2) DEFAULT 0,
    moneda VARCHAR(255),
    activo BOOLEAN DEFAULT true
);

-- =========================
-- MOVIMIENTO CAJA
-- =========================
CREATE TABLE movimiento_caja (
    id BIGSERIAL PRIMARY KEY,
    id_caja BIGINT NOT NULL,
    id_ventas BIGINT,
    tipo_movimiento VARCHAR(20) NOT NULL,
    monto NUMERIC(38,2) NOT NULL,
    moneda VARCHAR(10),
    descripcion VARCHAR(255),
    fecha TIMESTAMP DEFAULT now(),
    activo BOOLEAN DEFAULT true,

    CONSTRAINT fk_mov_caja
        FOREIGN KEY (id_caja) REFERENCES cuentascajas(id),

    CONSTRAINT fk_mov_ventas
        FOREIGN KEY (id_ventas) REFERENCES ventas(id)
);

-- =========================
-- TRIGGER FUNCTION
-- =========================
CREATE OR REPLACE FUNCTION actualizar_saldo_caja()
RETURNS trigger AS $$
BEGIN

    IF NEW.tipo_movimiento = 'INGRESO' THEN
        UPDATE cuentascajas
        SET saldo = saldo + COALESCE(NEW.monto,0)
        WHERE id = NEW.id_caja;
    END IF;

    IF NEW.tipo_movimiento = 'EGRESO' THEN
        UPDATE cuentascajas
        SET saldo = saldo - COALESCE(NEW.monto,0)
        WHERE id = NEW.id_caja;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- TRIGGER
-- =========================
CREATE TRIGGER trg_actualizar_saldo_caja
AFTER INSERT ON movimiento_caja
FOR EACH ROW
EXECUTE FUNCTION actualizar_saldo_caja();