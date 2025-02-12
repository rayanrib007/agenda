const Contato = require('../models/ContatoModal')

exports.index = (req, res)=>{
    res.render('contato', {contato:{}})
}

exports.register = async (req, res)=>{
    const contato = new Contato(req.body);
    try{
        await contato.register();
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(()=> res.redirect('back'));
            return;
        }
        req.flash('success', 'Contato registrado com sucesso');
        req.session.save(()=> res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    }catch(e){
        console.log(e);
        return res.render('404');
    }
}

exports.editIndex = async (req, res)=>{
    if(!req.params.id) return res.render('404');
    try{
        const contato = await Contato.buscaPorId(req.params.id);
        if(!contato) return res.render('404');
        res.render('contato', { contato });
    }catch(e){
        console.log(e);
        res.render('404')
    }
}

exports.edit = async (req, res)=>{
    try{
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(()=> res.redirect('back'));
            return;
        }
        req.flash('success', 'Contato editado com sucesso');
        req.session.save(()=> res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    }catch(e){
        console.log(e);
        res.render('404');
    }
}
exports.delete = async (req, res)=>{
    try{
        if(!req.params.id) return res.render('404');
        const contato = await Contato.delete(req.params.id);
        if(!contato) return res.render('404');
        req.flash('success', 'Contato exluído com sucesso');
        req.session.save(()=> res.redirect('back'));
        return;
    }catch(e){
        console.log(e);
        res.render('404')
    }
}