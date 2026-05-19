package com.sistema.sistema.Service;


import com.sistema.sistema.Dto.DtoMethodOfPaymed.methodOfPaymedDto;
import com.sistema.sistema.Model.MethodOfPaymedRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MethodPaymedService {

    private final MethodOfPaymedRepository paymedRepo;

    public MethodPaymedService(MethodOfPaymedRepository paymedRepo) {
        this.paymedRepo = paymedRepo;
    }

    public List<methodOfPaymedDto> getMethodPaymed(){
        return paymedRepo.findAllByOrderByIdDesc().stream().map(
                m-> new methodOfPaymedDto(
                        m.getId(),
                        m.getName(),
                        m.getMoneda(),
                        m.getSaldo(),
                        m.getActivo()
                )
        ).toList();
    }
}
