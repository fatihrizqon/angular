import { NgModule, PipeTransform, Pipe } from "@angular/core";
import { Company } from "../../models/company.model";
@Pipe({
    name : 'companyFilter'
})
export class CompanyFilterPipe implements PipeTransform{
    searchCompany   : String;
    kategori  : String;
    companies       : Company[];
    searchCategory(kategori){
        console.log(kategori)
    }
    transform(companies, searchCompany):Company[]{
        if(!searchCompany){
            return companies;
        }
        const value = searchCompany.toLowerCase();
        if(!companies || !searchCompany){
            return companies;
        }
        return companies.filter(companies => companies.perusahaan.toLowerCase().indexOf(searchCompany.toLowerCase(value)) !== -1);
    }
}