module.exports = {
    description: 'Add a standard view?',
    prompts: [
        {
            type: 'input',
            name: 'viewName',
            message: 'List view\'s name please'
        },
        {
            type: 'input',
            name: 'viewPath',
            message: 'List view\'s path please'
        }
    ],
    actions(data) {
        const { viewPath } = data;
        if (viewPath) {
            return [
                {
                    type: 'add',
                    path: 'src/views/{{viewPath}}/{{viewName}}/{{viewName}}.vue',
                    templateFile: 'plop-templates/standard.view/vue.hbs'
                },
                {
                    type: 'add',
                    path: 'src/views/{{viewPath}}/{{viewName}}/{{viewName}}.js',
                    templateFile: 'plop-templates/standard.view/js.hbs'
                },
                {
                    type: 'add',
                    path: 'src/views/{{viewPath}}/{{viewName}}/{{viewName}}.scss',
                    templateFile: 'plop-templates/standard.view/scss.hbs'
                }
            ];
        }
        return [
            {
                type: 'add',
                path: 'src/views/{{viewName}}/{{viewName}}.vue',
                templateFile: 'plop-templates/standard.view/vue.hbs'
            },
            {
                type: 'add',
                path: 'src/views/{{viewName}}/{{viewName}}.js',
                templateFile: 'plop-templates/standard.view/js.hbs'
            },
            {
                type: 'add',
                path: 'src/views/{{viewName}}/{{viewName}}.scss',
                templateFile: 'plop-templates/standard.view/scss.hbs'
            }
        ];
    }
};
