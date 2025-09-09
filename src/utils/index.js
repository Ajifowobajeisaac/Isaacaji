export function createPageUrl(name){const map={Home:'/',About:'/about',Projects:'/projects',Blog:'/blog',Contact:'/contact'};return map[name]??'/';}
