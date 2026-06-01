package com.sistema.sistema.Dto.DtoStock;

import java.math.BigDecimal;

public class StockValorTotalDto {
    private BigDecimal totalStock;

    public StockValorTotalDto() {

    }

    public StockValorTotalDto(BigDecimal totalStock){
        this.totalStock = totalStock;
    }

    public BigDecimal getTotalStock() {
        return totalStock;
    }

    public void setTotalStock(BigDecimal totalStock) {
        this.totalStock = totalStock;
    }
}
