package com.sistema.sistema.Service;


import com.sistema.sistema.Dto.DtoCajas.CajasDto;
import com.sistema.sistema.Model.CajasRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CajasService {

    private final CajasRepository paymedRepo;

    public CajasService(CajasRepository paymedRepo) {
        this.paymedRepo = paymedRepo;
    }

    public List<CajasDto> getMethodPaymed(){
        return paymedRepo.findAllByOrderByIdDesc().stream().map(
                m-> new CajasDto(
                        m.getId(),
                        m.getName(),
                        m.getMoneda(),
                        m.getSaldo(),
                        m.getActivo()
                )
        ).toList();
    }
}
